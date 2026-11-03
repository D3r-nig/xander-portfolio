import React from 'react';
import { Head } from '@inertiajs/react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import ProjectForm from '../../Components/ProjectForm';

export default function Create() {
    return (
        <>
            <Head title="Add a project · Xander Aspiras" />
            <Navbar management />
            <main className="project-admin-shell">
                <div className="project-editor-header project-admin-page-header">
                    <div>
                        <span className="mono project-manager-kicker">Portfolio management / New entry</span>
                        <h1 className="project-admin-title">Add a project.</h1>
                        <p className="project-admin-intro">Share the details and it will be added to your selected work.</p>
                    </div>
                    <a className="text-link" href="/projects">← Back to projects</a>
                </div>
                <section className="project-editor-panel project-editor-page" aria-labelledby="project-form-title">
                    <div className="project-editor-header">
                        <div><span className="mono project-manager-kicker">Project details</span><h2 id="project-form-title">What did you build?</h2></div>
                    </div>
                    <ProjectForm />
                </section>
            </main>
            <Footer />
        </>
    );
}
