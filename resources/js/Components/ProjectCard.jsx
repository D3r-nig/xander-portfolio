import React from 'react';

function projectImage(imagePath) {
    if (!imagePath) return '';
    return imagePath.startsWith('projects/') ? `/storage/${imagePath}` : `/${imagePath}`;
}

export default function ProjectCard({ project, index, management = false, onDelete }) {
    const tags = project.technologies.split(',').map((tag) => tag.trim()).filter(Boolean);
    const projectUrl = project.project_url || project.repository_url;
    const visualClass = project.title === 'MindForge' ? 'mindforge'
        : project.title === 'San Roque Dam' ? 'dam'
            : project.title === 'ITLabCare' ? 'lab' : 'mytask';

    return (
        <article className={`project-card ${!management && project.title === 'MindForge' ? 'project-feature' : ''} ${management ? '' : 'reveal'}`}>
            <div className={`project-visual ${visualClass}`}>
                {project.image_path && <img src={projectImage(project.image_path)} alt={`${project.title} preview`} />}
                <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="visual-label mono">{project.tagline}</span>
            </div>
            <div className="project-info">
                <div>
                    <span className="mono project-type">{project.category} / {new Date(`${project.completed_at}T00:00:00`).getFullYear()}</span>
                    <h3>{project.title}</h3>
                </div>
                {projectUrl ? <a className="arrow-button" href={projectUrl} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>↗</a> : <span className="arrow-button" aria-hidden="true">✳</span>}
                <p>{project.description}</p>
                <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            </div>
            {management && (
                <div className="project-actions">
                    <a className="project-action-btn edit-project" href={`/projects/${project.id}/edit`}>Edit project</a>
                    <button className="project-action-btn delete-project" type="button" onClick={() => onDelete(project)}>Delete</button>
                </div>
            )}
        </article>
    );
}
