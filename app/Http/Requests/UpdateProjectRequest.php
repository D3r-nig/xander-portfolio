<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /** @return array<string, list<mixed>> */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:100', Rule::unique('projects', 'title')->ignore($this->route('project'))],
            'category' => ['required', 'string', 'max:60'],
            'tagline' => ['required', 'string', 'max:80'],
            'description' => ['required', 'string', 'max:1200'],
            'project_url' => ['nullable', 'url', 'max:2048'],
            'repository_url' => ['nullable', 'url', 'max:2048'],
            'technologies' => ['required', 'string', 'max:200'],
            'completed_at' => ['required', 'date'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
        ];
    }

    /** @return array<string, string> */
    public function messages(): array
    {
        return [
            'image.image' => 'Please upload a valid image file.',
            'image.mimes' => 'Project images must be JPG, PNG, or WEBP files.',
            'image.max' => 'Project images must be 2 MB or smaller.',
        ];
    }
}
