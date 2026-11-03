# Portfolio Projects CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing portfolio into a Laravel + Inertia.js + React app and provide durable, validated Projects CRUD while retaining the public portfolio design.

**Architecture:** Keep the portfolio assets and visual styling, move page rendering and project cards to React/Inertia, and use a Laravel resource controller with Eloquent persistence. SQLite is the local default database so the project runs without a separate database server; project images are validated uploads stored on Laravel's public disk.

**Tech Stack:** Laravel, Inertia.js, React, Vite, Tailwind CSS, SQLite, PHPUnit.

**Spec:** User-provided `Midterm Activity.pdf` (six pages): Laravel/Inertia/React conversion; Projects section with at least five meaningful fields; migration/model/resource controller/routes; server validation, per-field errors and retained values; CRUD feedback and delete confirmation; public display; validation test table and setup documentation.

## Global Constraints

- Keep the original portfolio design and public content recognizable.
- Use Projects as the single dynamic section; provide at least five meaningful project fields.
- Persist records in a database; localStorage is not the source of truth.
- Validate on the Laravel server and show errors beside relevant inputs.
- Validate image uploads as images with allowed MIME types and a maximum size.
- Preserve entered values after validation errors.
- Confirm deletes and show success feedback for create, update, and delete.
- Do not introduce an authentication system unless the existing starter setup already provides it.

## Review Focus

- Database writes fail or database is not initialized: document and report the actual setup path; ensure normal app errors do not claim success.
- Invalid/oversized/non-image uploads: reject with a field error and retain other fields.
- Project title/URL duplicates: titles remain unique on edit when unchanged; malformed URLs are rejected.
- Project content used in the public cards: escape/render safely and handle optional links/images.
- Small screens and keyboard navigation: editor remains usable, labelled, and feedback is announced.

## File Map

- `composer.json`, `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `.env.example`: Laravel and frontend dependencies/config.
- `artisan`, `bootstrap/*`, `config/*`, `public/index.php`, `routes/web.php`: Laravel app entry and routes.
- `app/Models/Project.php`, `app/Http/Controllers/ProjectController.php`, `database/migrations/*`, `database/seeders/*`: database CRUD and starter content.
- `resources/js/app.jsx`, `resources/js/Pages/Portfolio.jsx`, `resources/js/Pages/Projects/{Index,Create,Edit}.jsx`, `resources/js/Components/{ProjectForm,Navbar,Footer}.jsx`: Inertia views and reusable UI.
- `resources/css/app.css`, `public/assets/*`: Tailwind entry, existing visual styling, and portfolio images.
- `tests/Feature/ProjectCrudTest.php`: server persistence, validation, edit, and delete behavior.
- `README.md`, `docs/project-crud.md`: setup, request flow, field/rule rationale, validation matrix, and assignment documentation.

## Tasks

### Task 1: Laravel and React application shell

**Files:** Laravel project configuration, `resources/js/app.jsx`, `resources/css/app.css`, Vite/Tailwind config, and copied portfolio assets.

- [ ] Establish the Laravel + Inertia React starter and confirm dependencies install.
- [ ] Preserve current HTML, CSS, and images as the starting React portfolio page and assets.
- [ ] Add a feature test confirming `/` renders the portfolio page through Inertia.
- [ ] Run the focused feature test and frontend build.

### Task 2: Database-backed Projects resource

**Files:** migration, model, controller, routes, seeder, and `tests/Feature/ProjectCrudTest.php`.

- [ ] Add feature tests for listing seeded projects, create, update, delete, and public display.
- [ ] Add negative tests for missing title, excessive field length, malformed URL, duplicate title, invalid image type, and oversized image.
- [ ] Implement `projects` fields: title, category, tagline, description, project URL, repository URL, image path, tags, and completion date.
- [ ] Add a unique title rule that ignores the current record on update; include a custom image validation message.
- [ ] Implement resource routes and server-side CRUD, storing images on the public disk.
- [ ] Seed the four projects currently shown on the portfolio and verify the focused suite.

### Task 3: Inertia portfolio and CRUD pages

**Files:** `resources/js/Pages/Portfolio.jsx`, `resources/js/Pages/Projects/{Index,Create,Edit}.jsx`, `resources/js/Components/ProjectForm.jsx`, shared layout components.

- [ ] Add the reusable project form and tests for validation errors and old input rendering.
- [ ] Render database projects on the public portfolio page with optional project/repository links and images.
- [ ] Build index/create/edit views with field-level errors, image preview, success feedback, and delete confirmation.
- [ ] Match the current portfolio styles and ensure the add/edit experience is clean and responsive.
- [ ] Build frontend assets and verify all CRUD pages render.

### Task 4: Documentation and end-to-end verification

**Files:** `README.md`, `docs/project-crud.md`, feature tests.

- [ ] Document setup, request flow, selected section and field justifications, rules, design decisions, and a six-case validation test table.
- [ ] Run migrations, seed data, backend feature tests, and production frontend build.
- [ ] Launch the app locally and verify create/edit/delete persist after reload and appear on the public page.
- [ ] Record remaining submission work that requires the student's own screenshots, voice demonstration, and shareable links.
