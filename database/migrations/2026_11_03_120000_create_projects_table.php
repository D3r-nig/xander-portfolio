<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->string('title', 100)->unique();
            $table->string('category', 60);
            $table->string('tagline', 80);
            $table->text('description');
            $table->string('project_url', 2048)->nullable();
            $table->string('repository_url', 2048)->nullable();
            $table->string('technologies', 200);
            $table->date('completed_at');
            $table->string('image_path')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
