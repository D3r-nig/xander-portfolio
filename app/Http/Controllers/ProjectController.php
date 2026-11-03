<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Projects/Index', [
            'projects' => Project::query()->orderByDesc('completed_at')->get(),
            'status' => session('success'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Projects/Create');
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $attributes = $request->validated();
        $image = $attributes['image'] ?? null;
        unset($attributes['image']);

        if ($image !== null) {
            $path = $image->store('projects', 'public');
            if ($path === false) {
                throw ValidationException::withMessages(['image' => 'The image could not be saved. Please try again.']);
            }
            $attributes['image_path'] = $path;
        }

        Project::create($attributes);

        return to_route('projects.index')->with('success', 'Project created successfully.');
    }

    public function edit(Project $project): Response
    {
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $attributes = $request->validated();
        $image = $attributes['image'] ?? null;
        unset($attributes['image']);

        if ($image !== null) {
            $oldImagePath = $project->image_path;
            $path = $image->store('projects', 'public');
            if ($path === false) {
                throw ValidationException::withMessages(['image' => 'The image could not be saved. Please try again.']);
            }
            $attributes['image_path'] = $path;

            $project->update($attributes);

            if ($oldImagePath !== null && str_starts_with($oldImagePath, 'projects/')) {
                Storage::disk('public')->delete($oldImagePath);
            }
            return to_route('projects.index')->with('success', 'Project updated successfully.');
        }

        $project->update($attributes);

        return to_route('projects.index')->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        if ($project->image_path !== null && str_starts_with($project->image_path, 'projects/')) {
            Storage::disk('public')->delete($project->image_path);
        }

        $project->delete();

        return to_route('projects.index')->with('success', 'Project deleted successfully.');
    }
}
