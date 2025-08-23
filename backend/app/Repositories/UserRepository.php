<?php

namespace App\Repositories;

use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function create(array $data): User
    {
        try {
            $data['password'] = Hash::make($data['password']);
            return User::create($data);
        } catch (\Throwable $th) {
            throw new Exception('Failed to create user: ' . $th->getMessage(), 500);
        }
    }

    public function findByEmail(string $email): ?User
    {
        try {
            return User::where('email', $email)->first();
        } catch (\Throwable $th) {
            throw new Exception('Failed to fetch user by email: ' . $th->getMessage(), 500);
        }
    }

    public function findUserById($id)
    {
        return User::find($id);
    }

    public function logout($user)
    {
        try {
            $user->currentAccessToken()->delete();
            return true;
        } catch (\Throwable $th) {
            throw new Exception("Failed to logout: " . $th->getMessage(), 500);
        }
    }

    public function update($id, array $data)
    {
        $user = $this->findUserById($id);
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        $user->update($data);

        return $user;
    }
}
