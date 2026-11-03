import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import ProjectCard from '../Components/ProjectCard';

function SectionLabel({ number, children }) {
    return <div className="section-label reveal"><span>{number}</span><span>{children}</span></div>;
}

export default function Portfolio({ projects }) {
    const [certificateOpen, setCertificateOpen] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    useEffect(() => {
        if (!certificateOpen) return undefined;
        document.body.classList.add('modal-open');
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setCertificateOpen(false);
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.classList.remove('modal-open');
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [certificateOpen]);

    useEffect(() => {
        const glow = document.querySelector('.cursor-glow');
        const moveGlow = (event) => {
            if (!glow) return;
            glow.style.left = `${event.clientX}px`;
            glow.style.top = `${event.clientY}px`;
        };
        window.addEventListener('pointermove', moveGlow);

        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
        } else {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });
            document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
            return () => {
                window.removeEventListener('pointermove', moveGlow);
                observer.disconnect();
            };
        }

        return () => window.removeEventListener('pointermove', moveGlow);
    }, [projects]);

    return (
        <>
            <div className="cursor-glow" aria-hidden="true" />
            <Navbar />
            <main id="top">
                <section className="hero section-grid gap-8 lg:!grid-cols-[1fr_minmax(0,2.25fr)] lg:gap-[6vw] px-5 sm:px-8 md:px-12 lg:px-[9vw] py-16 lg:py-[105px]">
                    <div className="hero-copy reveal w-full max-w-full min-w-0 lg:!col-start-2">
                        <p className="eyebrow"><span className="status-dot" /> Available for creative collaborations</p>
                        <h1>Building useful<br /><em>things,</em><br />beautifully.</h1>
                        <p className="hero-subtitle">I’m Xander — an IT student, UI/UX designer, and front-end developer turning everyday ideas into digital experiences that actually work.</p>
                        <div className="hero-actions"><a className="button button-primary" href="#work">See my work <span>↘</span></a><a className="text-link" href="#about">More about me <span>↓</span></a></div>
                    </div>
                    <div className="hero-visual reveal reveal-delay w-full max-w-full min-w-0 lg:!col-start-1 lg:!row-start-1">
                        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                        <div className="hero-card spotlight-card">
                            <div className="card-topline"><span>01 / 04</span><span className="mono">PORTFOLIO.LOG</span></div>
                            <img className="hero-avatar" src="/assets/profile1.jpg" alt="Portrait of Xander Aspiras" />
                            <div className="hero-card-copy"><span className="mono label">CURRENTLY LEARNING</span><strong>How to turn<br />lazy ideas into<br /><span>useful systems.</span></strong></div>
                            <div className="scribble">✳</div>
                        </div>
                        <div className="floating-note"><span className="note-dot" /> My idea. My design.<br />AI-assisted development.</div>
                    </div>
                </section>

                <section className="marquee" aria-label="Areas of expertise"><div className="marquee-track"><span>UI/UX DESIGN</span><i>✳</i><span>FRONT-END DEVELOPMENT</span><i>✳</i><span>AI-ASSISTED DEVELOPMENT</span><i>✳</i><span>UI/UX DESIGN</span><i>✳</i><span>FRONT-END DEVELOPMENT</span><i>✳</i></div></section>

                <section className="about section-grid section-pad gap-8 lg:!grid-cols-[1fr_minmax(0,2.25fr)] lg:gap-[6vw] px-5 sm:px-8 md:px-12 lg:px-[9vw]" id="about">
                    <SectionLabel number="01">About me</SectionLabel>
                    <div className="about-content reveal reveal-delay"><p className="section-kicker">The person behind the pixels</p><h2>I like making<br /><span>the complicated</span><br />feel simple.</h2><p className="body-copy">I’m currently studying <strong>BSIT at Urdaneta City University</strong>. I enjoy creating things that make everyday tasks easier — especially the repetitive ones that make me think, “Can I build something that does this for me?”</p><p className="body-copy">From sketching the first wireframe to shipping a working interface, I care about the little details that make products feel clear, human, and useful.</p><div className="about-stats"><div><strong>04</strong><span>Roles I explore</span></div><div><strong>∞</strong><span>Ideas to build</span></div><div><strong>01</strong><span>Dream bike</span></div></div></div>
                    <div className="about-aside reveal reveal-delay-2"><img className="profile-avatar" src="/assets/profile2.jpg" alt="Xander Aspiras riding a motorcycle" /><div className="quote-mark">“</div><p>Instead of doing the same repetitive things over and over, I like thinking:</p><strong>Can I build something that does this for me?</strong><span className="mono quote-credit">— a professional kamote</span></div>
                </section>

                <section className="work section-pad px-5 sm:px-8 md:px-12 lg:px-[5vw]" id="work">
                    <div className="section-heading reveal"><SectionLabel number="02">Selected work</SectionLabel><h2>Small projects.<br /><span>Real intention.</span></h2><p>Projects built around learning, problem-solving, and making the internet a little more useful.</p></div>
                    <div className="project-grid grid md:!grid-cols-2 gap-6">
                        {projects.map((project, index) => <ProjectCard key={project.id} project={project} index={index} />)}
                    </div>
                </section>

                <section className="skills section-pad px-5 sm:px-8 md:px-12 lg:px-[5vw]" id="skills"><SectionLabel number="03">Toolkit</SectionLabel><div className="skills-layout"><div className="skills-intro reveal"><h2>Curious by<br /><span>default.</span></h2><p>I use technology as a creative material — learning what I need, experimenting often, and keeping the human on the other side of the screen in mind.</p></div><div className="skill-columns reveal reveal-delay"><div className="skill-group"><span className="mono skill-index">01 / DEVELOPMENT</span><ul><li>HTML / CSS</li><li>JavaScript</li><li>Flutter / Dart</li><li>Laravel</li><li>Firebase</li><li>Git & GitHub</li></ul></div><div className="skill-group"><span className="mono skill-index">02 / DESIGN</span><ul><li>Figma</li><li>UI Design</li><li>UX Design</li><li>Wireframing</li><li>Prototyping</li><li>Responsive design</li></ul></div><div className="skill-group ai-group"><span className="mono skill-index">03 / AI ASSISTANTS</span><ul><li>OpenAI Codex</li><li>ChatGPT</li><li>Claude</li><li>Gemini</li><li>Manus</li><li>GitHub Copilot</li></ul></div></div></div></section>

                <section className="education section-grid section-pad gap-8 lg:!grid-cols-[1fr_minmax(0,2.25fr)] lg:gap-[6vw] px-5 sm:px-8 md:px-12 lg:px-[9vw]" id="education"><SectionLabel number="04">Education / experience</SectionLabel><div className="timeline reveal reveal-delay"><article className="timeline-item"><span className="mono timeline-date">CURRENT</span><h2>BS Information Technology</h2><p>Urdaneta City University</p><span className="mono">Building foundations in software, systems, and user-centered technology.</span></article><article className="timeline-item"><span className="mono timeline-date">CERTIFICATION</span><h2>ICT NC II</h2><p>Technical-Vocational-Livelihood</p><span className="mono">Foundational ICT knowledge and practical skills.</span></article></div></section>

                <section className="cert section-grid section-pad"><SectionLabel number="05">Certification</SectionLabel><button className="cert-card reveal reveal-delay" type="button" aria-label="View ICT NC II certificate" onClick={() => setCertificateOpen(true)}><div className="cert-icon">✦</div><div><span className="mono">TECHNICAL-VOCATIONAL-LIVELIHOOD</span><h2>ICT <em>NC II</em></h2><p>A certification demonstrating foundational knowledge and practical skills in Information and Communications Technology.</p><span className="cert-hint mono">CLICK TO VIEW CERTIFICATE ↗</span></div><span className="cert-year mono">CERTIFIED<br />&nbsp;✳</span></button></section>

                <section className="contact section-pad px-5 sm:px-8 md:px-12 lg:px-[5vw]" id="contact"><div className="contact-inner reveal"><p className="section-kicker">Have an idea?</p><h2>Let’s build<br /><em>something.</em></h2><p>Interested in working together, discussing a project, or just saying hello? Send a message below.</p><form className="contact-form" onSubmit={(event) => { event.preventDefault(); setMessageSent(true); event.currentTarget.reset(); }}><label htmlFor="name">Name</label><input id="name" name="name" type="text" autoComplete="name" required minLength="2" /><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /><label htmlFor="message">Message</label><textarea id="message" name="message" rows="4" required minLength="10" /><button className="button button-primary" type="submit">Prepare message <span>↗</span></button><p className="form-status" role="status">{messageSent ? 'Thanks! Your message is ready to send. I will get back to you soon.' : ''}</p></form><a className="email-link" href="mailto:xanderjosueaspiras@gmail.com">xanderjosueaspiras@gmail.com <span>↗</span></a></div><div className="contact-deco">✳</div></section>
            </main>
            <Footer />
            {certificateOpen && <div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-title"><button className="modal-backdrop" type="button" aria-label="Close certificate" onClick={() => setCertificateOpen(false)} /><div className="modal-card"><div className="modal-toolbar"><div><span className="mono">CERTIFICATION / ICT NC II</span><h2 id="certificate-title">National Certificate II</h2></div><button className="modal-close" type="button" aria-label="Close certificate" onClick={() => setCertificateOpen(false)}>×</button></div><img src="/assets/ict-nc-ii-certificate.jpg" alt="ICT NC II certificate for Alexander J. Aspiras" /></div></div>}
        </>
    );
}
