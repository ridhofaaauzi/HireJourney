<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobApplicationRequest;
use App\Models\JobApplication;
use App\Services\JobApplicationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobApplicationController extends Controller
{

    protected $jobApplicationService;

    public function __construct(JobApplicationService $jobApplicationService)
    {
        return $this->jobApplicationService = $jobApplicationService;
    }

    public function index()
    {
        try {
            $userId = Auth::id();
            $jobApplication = $this->jobApplicationService->getAllByUser($userId);
            return response()->json($jobApplication);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function store(JobApplicationRequest $request)
    {
        try {
            $data = $request->validated();

            $userId = Auth::id();
            $jobApplication = $this->jobApplicationService->create($data, $userId);
            return response()->json($jobApplication, 201);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $userId = Auth::id();
            $jobApplication = $this->jobApplicationService->getById($id, $userId);

            return response()->json($jobApplication);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function update(JobApplicationRequest $request, $id)
    {
        try {
            $data = $request->validated();

            $userId = Auth::id();
            $jobApplication = $this->jobApplicationService->update($id, $data, $userId);

            return response()->json($jobApplication);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $userId = Auth::id();
            $this->jobApplicationService->delete($id, $userId);

            return response()->json([
                'message' => 'Deleted Successfully'
            ]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()], 500);
        }
    }
}
