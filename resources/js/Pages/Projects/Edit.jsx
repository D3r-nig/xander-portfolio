import React from 'react';
import { Head } from '@inertiajs/react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import ProjectForm from '../../Components/ProjectForm';

export default function Edit({ project }) {
    return (
        <>
            <Head title={`Edit ${project.title} · Xander Aspiras`} />
            <Navbar management />
            <main className="project-admin-shell">
                <div className="project-editor-header project-admin-page-header">
                    <div>
                        <span className="mono project-manager-kicker">Portfolio management / Update</span>
                        <h1 className="project-admin-title">Edit {project.title}.</h1>
                        <p className="project-admin-intro">Update your project details, links, or image.</p>
                    </div>
                    <a className="text-link" href="/projects">← Back to projects</a>
                </div>
                <section className="project-editor-panel project-editor-page" aria-labelledby="project-form-title">
                    <div className="project-editor-header">
                        <div><span className="mono project-manager-kicker">Project details</span><h2 id="project-form-title">Make it current.</h2></div>
                    </div>
                    <ProjectForm project={project} />
                </section>
            </main>
            <Footer />
        </>
    );
}
