<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Exception;

class AuthService
{
    protected $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    public function register(array $data)
    {
        try {
            $user = $this->userRepo->create($data);
            $accessToken = $user->createToken('auth_token')->plainTextToken;
            $refreshToken = bin2hex(random_bytes(40));

            $user->refresh_token = hash('sha256', $refreshToken);
            $user->save();

            return [
                'user' => $user,
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
            ];
        } catch (Exception $th) {
            throw new Exception("Registration failed: " . $th->getMessage(), 500);
        }
    }

    public function login(array $data)
    {
        try {
            $user = $this->userRepo->findByEmail($data['email']);

            if (! $user || ! Hash::check($data['password'], $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }

            $accessToken = $user->createToken('auth_token')->plainTextToken;
            $refreshToken = bin2hex(random_bytes(40));

            $user->refresh_token = hash('sha256', $refreshToken);
            $user->save();

            return [
                'user' => $user,
                'access_token' => $accessToken,
                'refresh_token' => $refreshToken,
            ];
        } catch (ValidationException $th) {
            throw $th;
        } catch (Exception $th) {
            throw new Exception("Login failed: " . $th->getMessage(), 500);
        }
    }

    public function refreshToken($request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                throw new Exception('User not authenticated');
            }

            $user->currentAccessToken()->delete();

            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'success' => true,
                'token'   => $token,
                'message' => 'Token refreshed successfully'
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Refresh token failed: ' . $e->getMessage()
            ];
        }
    }

    public function logout($user)
    {
        try {
            return $this->userRepo->logout($user);
        } catch (\Throwable $th) {
            throw new Exception("Logout failed: " . $th->getMessage(), 500);
        }
    }
}
