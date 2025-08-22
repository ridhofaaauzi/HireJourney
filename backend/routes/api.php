<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\JobApplicationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh-token', [AuthController::class, 'refreshToken']);

    Route::get('job-applications', [JobApplicationController::class, 'index']);
    Route::post('job-applications', [JobApplicationController::class, 'store']);
    Route::get('job-applications/{id}', [JobApplicationController::class, 'show']);
    Route::put('job-applications/{id}', [JobApplicationController::class, 'update']);
    Route::delete('job-applications/{id}', [JobApplicationController::class, 'destroy']);
});
