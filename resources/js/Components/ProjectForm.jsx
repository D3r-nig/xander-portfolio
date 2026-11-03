import React, { useEffect, useState } from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function ProjectForm({ project = null }) {
    const form = useForm({
        title: project?.title || '',
        category: project?.category || '',
        tagline: project?.tagline || '',
        description: project?.description || '',
        project_url: project?.project_url || '',
        repository_url: project?.repository_url || '',
        technologies: project?.technologies || '',
        completed_at: project?.completed_at || '',
        image: null,
    });
    const [preview, setPreview] = useState(project?.image_path
        ? (project.image_path.startsWith('projects/') ? `/storage/${project.image_path}` : `/${project.image_path}`)
        : '');

    useEffect(() => {
        if (!(form.data.image instanceof File)) return undefined;
        const imageUrl = URL.createObjectURL(form.data.image);
        setPreview(imageUrl);
        return () => URL.revokeObjectURL(imageUrl);
    }, [form.data.image]);

    const submit = (event) => {
        event.preventDefault();
        if (project) {
            form.transform((data) => ({ ...data, _method: 'put' }));
            form.post(`/projects/${project.id}`, { forceFormData: true });
            return;
        }
        form.post('/projects', { forceFormData: true });
    };

    const field = (name, label, type = 'text', placeholder = '') => (
        <label key={name} className="project-input-label">
            <span>{label}</span>
            <input
                type={type}
                name={name}
                value={form.data[name]}
                placeholder={placeholder}
                maxLength={name === 'title' ? 100 : undefined}
                required={['title', 'category', 'tagline', 'technologies', 'completed_at'].includes(name)}
                aria-invalid={Boolean(form.errors[name])}
                aria-describedby={form.errors[name] ? `${name}-error` : undefined}
                onChange={(event) => form.setData(name, event.target.value)}
            />
            {form.errors[name] && <small className="field-error" id={`${name}-error`} role="alert">{form.errors[name]}</small>}
        </label>
    );

    return (
        <form className="project-form" onSubmit={submit} encType="multipart/form-data">
            <div className="project-form-grid">
                {field('title', 'Project name', 'text', 'e.g. MyTask')}
                {field('category', 'Category', 'text', 'Mobile app / Web design')}
                {field('tagline', 'Short label', 'text', 'PLAN / TRACK / ACHIEVE')}
                {field('completed_at', 'Date completed', 'date')}
                {field('project_url', 'Project link (optional)', 'url', 'https://example.com')}
                {field('repository_url', 'Repository link (optional)', 'url', 'https://github.com/...')}
                {field('technologies', 'Tech stack', 'text', 'Flutter, Dart, Firebase')}
                <label className="project-input-label project-image-field">
                    <span>Project image <small>JPG, PNG, or WEBP · up to 2 MB</small></span>
                    <input
                        type="file"
                        name="image"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        aria-invalid={Boolean(form.errors.image)}
                        aria-describedby={form.errors.image ? 'image-error' : undefined}
                        onChange={(event) => form.setData('image', event.target.files[0] || null)}
                    />
                    {form.errors.image && <small className="field-error" id="image-error" role="alert">{form.errors.image}</small>}
                </label>
            </div>
            <label className="project-input-label project-description-field">
                <span>Description</span>
                <textarea
                    name="description"
                    rows="5"
                    maxLength="1200"
                    required
                    value={form.data.description}
                    aria-invalid={Boolean(form.errors.description)}
                    aria-describedby={form.errors.description ? 'description-error' : undefined}
                    onChange={(event) => form.setData('description', event.target.value)}
                />
                {form.errors.description && <small className="field-error" id="description-error" role="alert">{form.errors.description}</small>}
            </label>
            <div className={`project-image-preview-wrap ${preview ? 'has-preview' : ''}`}>
                {preview ? <img id="project-image-preview" className="visible" src={preview} alt="Selected project preview" /> : <p>Image preview will appear here</p>}
            </div>
            <div className="project-form-actions">
                <Link className="button button-secondary" href="/projects">Cancel</Link>
                <button className="button button-primary" type="submit" disabled={form.processing}>
                    {form.processing ? 'Saving…' : project ? 'Save changes' : 'Save project'} <span>↗</span>
                </button>
            </div>
        </form>
    );
}
