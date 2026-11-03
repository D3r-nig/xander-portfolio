<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectCrudTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_public_portfolio_is_an_inertia_page(): void
    {
        $this->get('/')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Portfolio'));
    }

    public function test_create_and_edit_pages_render_as_inertia_pages(): void
    {
        $this->get('/projects/create')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('Projects/Create'));

        $project = \App\Models\Project::create($this->validProject());

        $this->get("/projects/{$project->id}/edit")
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Projects/Edit')
                ->where('project.title', 'MyTask'));
    }

    public function test_projects_can_be_created_updated_and_deleted(): void
    {
        $this->post('/projects', $this->validProject())
            ->assertRedirect('/projects')
            ->assertSessionHas('success', 'Project created successfully.')
            ->assertSessionHasNoErrors();

        $this->assertDatabaseHas('projects', [
            'title' => 'MyTask',
            'category' => 'Productivity app',
            'description' => 'A task planning application.',
        ]);

        $record = \App\Models\Project::where('title', 'MyTask')->firstOrFail();

        $this->get('/projects')->assertInertia(fn (Assert $page) => $page
            ->component('Projects/Index')
            ->has('projects', 1)
            ->where('projects.0.title', 'MyTask'));

        $this->put("/projects/{$record->id}", $this->validProject([
            'title' => 'MyTask 2',
        ]))
            ->assertRedirect('/projects')
            ->assertSessionHas('success', 'Project updated successfully.');

        $this->assertDatabaseHas('projects', ['id' => $record->id, 'title' => 'MyTask 2']);

        $this->delete("/projects/{$record->id}")
            ->assertRedirect('/projects')
            ->assertSessionHas('success', 'Project deleted successfully.');

        $this->assertDatabaseMissing('projects', ['id' => $record->id]);
    }

    public function test_public_portfolio_displays_projects_from_the_database(): void
    {
        $record = \App\Models\Project::create($this->validProject());

        $this->get('/')
            ->assertInertia(fn (Assert $page) => $page
                ->component('Portfolio')
                ->has('projects', 1)
                ->where('projects.0.title', $record->title));
    }

    public function test_required_fields_are_validated(): void
    {
        $this->post('/projects', [])
            ->assertSessionHasErrors(['title', 'category', 'tagline', 'description', 'completed_at']);
    }

    public function test_validation_errors_and_entered_values_return_to_the_form(): void
    {
        $version = app(\App\Http\Middleware\HandleInertiaRequests::class)->version(request());
        $headers = ['X-Inertia' => 'true'];
        if ($version !== null) {
            $headers['X-Inertia-Version'] = $version;
        }
        $this->withHeaders($headers);

        $this->from('/projects/create')->post('/projects', $this->validProject([
            'title' => str_repeat('x', 101),
        ]))
            ->assertRedirect('/projects/create')
            ->assertSessionHasErrors('title')
            ->assertSessionHas('_old_input.category', 'Productivity app');

        $this->get('/projects/create')->assertOk();
    }

    public function test_title_length_and_project_url_are_validated(): void
    {
        $this->post('/projects', $this->validProject([
            'title' => str_repeat('x', 101),
            'project_url' => 'not a URL',
        ]))->assertSessionHasErrors(['title', 'project_url']);
    }

    public function test_project_titles_are_unique_but_unchanged_title_is_allowed_on_update(): void
    {
        $existing = \App\Models\Project::create($this->validProject());

        $this->post('/projects', $this->validProject())
            ->assertSessionHasErrors('title');

        $this->put("/projects/{$existing->id}", $this->validProject())
            ->assertSessionHasNoErrors();
    }

    public function test_non_image_uploads_are_rejected(): void
    {
        Storage::fake('public');

        $this->post('/projects', $this->validProject([
            'image' => UploadedFile::fake()->create('notes.pdf', 20, 'application/pdf'),
        ]))->assertSessionHasErrors('image');
    }

    public function test_project_images_are_saved_to_public_storage(): void
    {
        Storage::fake('public');
        $image = UploadedFile::fake()->createWithContent(
            'preview.jpg',
            file_get_contents(base_path('assets/mytask.jpg')),
        );

        $this->post('/projects', $this->validProject([
            'title' => 'Image upload',
            'image' => $image,
        ]))->assertRedirect('/projects')->assertSessionHasNoErrors();

        $project = \App\Models\Project::where('title', 'Image upload')->firstOrFail();
        $this->assertStringStartsWith('projects/', $project->image_path);
        Storage::disk('public')->assertExists($project->image_path);
    }

    public function test_images_over_two_megabytes_are_rejected(): void
    {
        Storage::fake('public');
        $jpeg = file_get_contents(base_path('assets/mytask.jpg'));

        $this->post('/projects', $this->validProject([
            'image' => UploadedFile::fake()->createWithContent('large.jpg', $jpeg.str_repeat(' ', 2 * 1024 * 1024)),
        ]))->assertSessionHasErrors(['image' => 'Project images must be 2 MB or smaller.']);
    }

    private function validProject(array $overrides = []): array
    {
        return array_merge([
            'title' => 'MyTask',
            'category' => 'Productivity app',
            'tagline' => 'Plan and track',
            'description' => 'A task planning application.',
            'project_url' => 'https://example.com/project',
            'repository_url' => 'https://github.com/example/project',
            'technologies' => 'Flutter, Dart',
            'completed_at' => '2025-06-15',
        ], $overrides);
    }
}
