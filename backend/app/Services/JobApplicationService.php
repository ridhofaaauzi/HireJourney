<?php

namespace App\Services;

use App\Repositories\JobApplicationRepository;
use Exception;

class JobApplicationService
{
    protected $jobApplicationRepository;

    public function __construct(JobApplicationRepository $jobApplicationRepository)
    {
        $this->jobApplicationRepository = $jobApplicationRepository;
    }

    public function getAllByUser($userId)
    {
        return $this->jobApplicationRepository->getAllByUser($userId);
    }

    public function getById($id, $userId)
    {
        $jobApplication = $this->jobApplicationRepository->findById($id, $userId);

        if (!$jobApplication) {
            throw new Exception("Job application not found", 404);
        }

        return $jobApplication;
    }

    public function create(array $data, $userId)
    {
        $data['user_id'] = $userId;
        return $this->jobApplicationRepository->create($data);
    }

    public function update($id, array $data, $userId)
    {
        $jobApplication = $this->getById($id, $userId);
        return $this->jobApplicationRepository->update($jobApplication, $data);
    }

    public function delete($id, $userId)
    {
        $jobApplication = $this->getById($id, $userId);
        return $this->jobApplicationRepository->delete($jobApplication);
    }

    public function getJobCountsForUser($userId)
    {
        $counts = $this->jobApplicationRepository->countByStatusForUser($userId);

        $allStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
        foreach ($allStatuses as $status) {
            if (!isset($counts[$status])) {
                $counts[$status] = 0;
            }
        }

        return $counts;
    }
}
