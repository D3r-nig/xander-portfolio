# Xander Aspiras Portfolio

Personal portfolio built with Laravel 13, Inertia.js, React, Tailwind CSS, and SQLite. The Projects section is database-backed and supports create, read, update, and delete operations.

## Requirements

- PHP 8.3 or newer with `fileinfo` and `pdo_sqlite` enabled
- Composer
- Node.js 20.19+ or 22.12+

## Run locally (Windows PowerShell)

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item -ItemType File -Path database/database.sqlite -Force
php artisan migrate --seed
php artisan storage:link
npm install
npm run dev
```

In a second terminal, run:

```powershell
php artisan serve
```

Open `http://127.0.0.1:8000`. Vite serves the frontend while `npm run dev` is running. For a production asset build, run `npm run build`.

The seeder restores the four portfolio projects. New project records are stored in `database/database.sqlite`; uploaded images go to `storage/app/public/projects` and are served through `public/storage`.

## Projects CRUD

- Public portfolio: `/`
- Project list: `/projects`
- Add a project: `/projects/create`
- Edit: choose **Edit project** on the list
- Delete: choose **Delete** and confirm

The project form validates on Laravel's server. Titles must be unique. Project and repository links are optional but must be valid URLs when provided. Images accept JPG, PNG, and WEBP files up to 2 MB.

## Verification

Run `php artisan test` for the feature tests and `npm run build` for the production frontend build. See [docs/project-crud.md](docs/project-crud.md) for the field definitions, validation rules, test table, and request flow.
