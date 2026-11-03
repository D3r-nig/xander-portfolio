import React, { useEffect, useState } from 'react';

export default function Navbar({ management = false }) {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!menuOpen) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setMenuOpen(false);
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [menuOpen]);

    return (
        <header className="site-header flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-[5vw]">
            <a className="brand" href="/" aria-label="Xander Aspiras home">
                <span className="brand-mark">XA</span><span>Xander Aspiras</span>
            </a>
            <nav className={`desktop-nav hidden md:!flex ${menuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
                {(management
                    ? [['Portfolio', '/'], ['Projects', '/projects']]
                    : [['About', '#about'], ['Work', '#work'], ['Skills', '#skills'], ['Education', '#education'], ['Contact', '#contact']]
                ).map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
            </nav>
            <a className="header-cta hidden md:!inline-flex" href={management ? '/#work' : '/projects'}>
                {management ? 'View portfolio' : 'Manage projects'} <span>↗</span>
            </a>
            <button
                className="menu-toggle md:!hidden"
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
            >{menuOpen ? '×' : '☰'}</button>
        </header>
    );
}
