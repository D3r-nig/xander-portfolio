<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @var list<string> */
    protected $fillable = [
        'title',
        'category',
        'tagline',
        'description',
        'project_url',
        'repository_url',
        'technologies',
        'completed_at',
        'image_path',
    ];

    /** @return array<string, string> */
    protected function casts(): array
    {
        return ['completed_at' => 'date:Y-m-d'];
    }
}
