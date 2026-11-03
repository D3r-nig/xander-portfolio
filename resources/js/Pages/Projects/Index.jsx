import React, { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
import ProjectCard from '../../Components/ProjectCard';

export default function Index({ projects, status }) {
    const [pendingDelete, setPendingDelete] = useState(null);

    useEffect(() => {
        if (!pendingDelete) return undefined;
        document.body.classList.add('modal-open');
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setPendingDelete(null);
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [pendingDelete]);
    const confirmDelete = () => {
        router.delete(`/projects/${pendingDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => setPendingDelete(null),
        });
    };

    return (
        <>
            <Head title="Manage projects · Xander Aspiras" />
            <Navbar management />
            <main className="project-admin-shell">
                <section className="project-manager">
                    <div className="project-manager-header">
                        <div>
                            <span className="mono project-manager-kicker">Portfolio management</span>
                            <h1 className="project-admin-title">Your projects.</h1>
                            <p className="project-admin-intro">Add, update, and manage the work visitors see on your portfolio.</p>
                        </div>
                        <a className="button button-primary add-project-btn" href="/projects/create">Add project <span>＋</span></a>
                    </div>
                    {status && <p className="project-success" role="status">{status}</p>}
                    {projects.length ? (
                        <div className="project-grid project-admin-grid">
                            {projects.map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} management onDelete={setPendingDelete} />
                            ))}
                        </div>
                    ) : (
                        <div className="project-empty-state">
                            <span className="mono project-manager-kicker">A fresh start</span>
                            <h2>No projects yet.</h2>
                            <p>Add your first project and it will appear in your public portfolio.</p>
                            <a className="button button-primary" href="/projects/create">Add a project <span>↗</span></a>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
            {pendingDelete && (
                <div className="project-confirm-backdrop" role="presentation" onClick={() => setPendingDelete(null)}>
                    <section className="project-confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="delete-project-title" onClick={(event) => event.stopPropagation()}>
                        <span className="mono project-manager-kicker">Confirm deletion</span>
                        <h2 id="delete-project-title">Delete {pendingDelete.title}?</h2>
                        <p>This removes the project from your portfolio. This action cannot be undone.</p>
                        <div className="project-form-actions">
                            <button className="button button-secondary" type="button" onClick={() => setPendingDelete(null)}>Keep project</button>
                            <button className="button button-primary danger-button" type="button" onClick={confirmDelete}>Delete project</button>
                        </div>
                    </section>
                </div>
            )}
        </>
    );
}
