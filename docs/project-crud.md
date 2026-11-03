# Projects CRUD Documentation

## Section chosen and justification

The Projects section is dynamic because project descriptions, links, tech stacks, completion dates, and images change as work is completed. Keeping these fields in SQLite makes the portfolio content manageable through forms and lets the public page read the current project list from the database.

## Project fields

| Field | Database type | Purpose |
| --- | --- | --- |
| `title` | Unique string, max 100 | Project name shown on the card and used to distinguish records. |
| `category` | String, max 60 | Classifies the work, such as mobile app or web design. |
| `tagline` | String, max 80 | Short label displayed over the project image. |
| `description` | Text, max 1200 | Explains the project on its public card. |
| `project_url` | Nullable string, max 2048 | Optional public project or demo link. |
| `repository_url` | Nullable string, max 2048 | Optional source-code link. |
| `technologies` | String, max 200 | Comma-separated tools shown as project tags. |
| `completed_at` | Date | Completion date shown with the project category. |
| `image_path` | Nullable string | Path for the bundled preview image or an uploaded image. |

The upload form's `image` field is validated as a file and stored on Laravel's public disk; only its path is saved in `image_path`.

## Validation rules

- `title`, `category`, `tagline`, `description`, `technologies`, and `completed_at` are required.
- Text fields must be strings and stay within their documented maximum lengths.
- `title` must be unique; the update rule ignores the record being edited.
- Optional project and repository links must be valid URLs.
- `completed_at` must be a valid date.
- An uploaded image must be JPG, JPEG, PNG, or WEBP and no larger than 2 MB.
- Image validation has custom messages. Laravel returns errors to the same form, and the reusable React form shows each error beside its field while retaining the entered values.

## Request flow and design decisions

`Route::resource('projects', ProjectController::class)->except('show')` maps the list, create, store, edit, update, and delete routes to a separate resource controller. `StoreProjectRequest` and `UpdateProjectRequest` validate requests on the server. The controller creates or updates the Eloquent `Project` model, which writes to the SQLite `projects` table; the controller then returns an Inertia response or redirects with a success message. Inertia passes project records and validation errors to the React pages without a separate API or client-side router.

The `Projects/Index`, `Projects/Create`, and `Projects/Edit` pages share `ProjectForm.jsx`. `Portfolio.jsx` reads the same database records and renders their cards publicly. The project list uses a confirmation dialog before deleting a record. Tailwind is built locally, and the existing portfolio styles and images are retained to preserve the original design.

Project routes are currently open without login, which keeps the classroom CRUD demo accessible. Add authentication before deploying this project as a public production site.

## Validation test table

| # | Test case | Input | Expected result | Actual result |
| --- | --- | --- | --- | --- |
| 1 | Required fields | Submit an empty project form | Required errors return to the form | Pass: `test_required_fields_are_validated` |
| 2 | Length and URL format | Title over 100 characters and malformed project URL | Errors appear for title and project URL | Pass: `test_title_length_and_project_url_are_validated` |
| 3 | Unique title | Create a duplicate title; update a record without changing its title | Duplicate create is rejected; unchanged title can be updated | Pass: `test_project_titles_are_unique_but_unchanged_title_is_allowed_on_update` |
| 4 | Wrong image type | Upload a PDF as the project image | Image field error is returned | Pass: `test_non_image_uploads_are_rejected` |
| 5 | Image size limit | Upload an image larger than 2 MB | Image field error is returned | Pass: `test_images_over_two_megabytes_are_rejected` |
| 6 | Persistence and CRUD | Create, read, update, then delete a project | Records appear in SQLite and public page; changes persist across requests; delete removes the record after confirmation | Pass: `test_projects_can_be_created_updated_and_deleted` and `test_public_portfolio_displays_projects_from_the_database` |

The suite contains 13 tests overall, including 11 focused CRUD feature tests and the starter tests. The documented verification commands are `php artisan test` and `npm run build`.

## Folder structure

- `app/Models/Project.php` — Eloquent model and `$fillable` allow-list.
- `app/Http/Controllers/ProjectController.php` — project resource actions.
- `app/Http/Requests/StoreProjectRequest.php` and `UpdateProjectRequest.php` — server validation.
- `database/migrations/2026_11_03_120000_create_projects_table.php` — Projects schema.
- `database/seeders/ProjectSeeder.php` — the four existing portfolio projects.
- `routes/web.php` — public portfolio and Projects resource routes.
- `resources/js/Pages/Portfolio.jsx` — public portfolio page.
- `resources/js/Pages/Projects/` — index, create, and edit pages.
- `resources/js/Components/` — shared form, project card, navbar, and footer.
- `resources/css/` — Tailwind entry point and retained portfolio styling.

## Submission items to finish personally

Capture and label screenshots of the public page, project index, create page, edit page, delete confirmation, success message, and validation errors. Record the required voice demonstration and upload it to Drive or YouTube as instructed. Fill in the activity section/class if needed, your own reflection answers, and both submission links. This file documents the implementation but does not invent those personal materials.
