import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-intro">
                <span className="footer-mark">XA</span>
                <div><p className="mono">Xander Aspiras · BSIT student</p><p className="footer-note">Still learning. Still building useful things.</p></div>
            </div>
            <div className="footer-links">
                <span className="mono footer-label">Find me elsewhere</span>
                <div>
                    <a href="https://github.com/D3r-nig" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
                    <a href="mailto:xanderjosueaspiras@gmail.com">Email <span>↗</span></a>
                    <a href="https://www.linkedin.com/in/xander-aspiras-b41658350/" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
                </div>
            </div>
            <div className="footer-bottom"><span>© 2026 Xander Aspiras</span><span>Built with Laravel, React & Tailwind CSS</span></div>
        </footer>
    );
}
