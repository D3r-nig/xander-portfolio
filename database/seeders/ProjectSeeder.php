<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'MyTask',
                'category' => 'Productivity app',
                'tagline' => 'PLAN / TRACK / ACHIEVE',
                'description' => 'MyTask is a simple, modern, and user-friendly productivity application developed using Flutter and Dart to help users organize their daily tasks and improve their productivity. Designed with a clean dark interface and vibrant purple accents, MyTask provides a convenient way to manage responsibilities, track progress, and stay organized throughout the day.',
                'project_url' => 'https://drive.google.com/drive/folders/1tnBC0E5K0VoDvv9Njueo-m09gR7FBjaw?usp=drive_link',
                'repository_url' => null,
                'technologies' => 'Flutter, Dart, Productivity App',
                'completed_at' => '2025-01-01',
                'image_path' => 'assets/mytask.jpg',
            ],
            [
                'title' => 'MindForge',
                'category' => 'Mobile app',
                'tagline' => 'PLAY • LEARN • GROW',
                'description' => 'A Flutter-based educational word-puzzle game designed to make learning more interactive and engaging. The project combines gameplay mechanics with vocabulary challenges and uses Firebase for authentication and data management.',
                'project_url' => null,
                'repository_url' => null,
                'technologies' => 'Flutter, Dart, Firebase',
                'completed_at' => '2024-01-01',
                'image_path' => 'assets/mindforge-screen.png',
            ],
            [
                'title' => 'San Roque Dam',
                'category' => 'Web design',
                'tagline' => 'OPEN LIVE SITE ↗',
                'description' => 'A website project focused on presenting information about San Roque Dam in a simple, organized, and visually appealing way. The project focuses on user-friendly design and presenting important information through a modern web interface.',
                'project_url' => 'https://san-roque-ten.vercel.app/',
                'repository_url' => null,
                'technologies' => 'Web Design, UI/UX, Front-End Development',
                'completed_at' => '2025-01-01',
                'image_path' => 'assets/san-roque-dam.png',
            ],
            [
                'title' => 'ITLabCare',
                'category' => 'Web app',
                'tagline' => 'ORGANIZE / ACCESS',
                'description' => 'A school-focused web project designed to help organize and present information related to IT laboratory resources and activities. The project focuses on creating a clean interface and making information easier to access and manage.',
                'project_url' => null,
                'repository_url' => null,
                'technologies' => 'UI/UX, Web Development, Front-End Development',
                'completed_at' => '2025-01-01',
                'image_path' => 'assets/itlabcare-logo.png',
            ],
        ];

        foreach ($projects as $attributes) {
            Project::updateOrCreate(['title' => $attributes['title']], $attributes);
        }
    }
}
