<?php

use App\Http\Controllers\ProjectController;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Portfolio', [
        'projects' => Project::query()->orderByDesc('completed_at')->get(),
    ]);
});

Route::resource('projects', ProjectController::class)->except('show');
