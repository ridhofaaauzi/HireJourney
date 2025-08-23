<?php

namespace App\Repositories;

use App\Models\JobApplication;

class JobApplicationRepository
{
    public function getAllByUser($userId)
    {
        return JobApplication::where('user_id', $userId)->get();
    }

    public function findById($id, $userId)
    {
        return JobApplication::where('id', $id)->where('user_id', $userId)->first();
    }

    public function create(array $data)
    {
        return JobApplication::create($data);
    }

    public function update(JobApplication $jobApplication, array $data)
    {
        $jobApplication->update($data);
        return $jobApplication;
    }

    public function delete(JobApplication $jobApplication)
    {
        return $jobApplication->delete();
    }

    public function countByStatusForUser($userId): array
    {
        return JobApplication::where('user_id', $userId)
            ->selectRaw('status, COUNT(*) as count')
            ->groupBy('status')
            ->pluck('count', 'status')
            ->toArray();
    }
}
