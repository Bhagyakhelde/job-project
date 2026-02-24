import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Saved', path: '/saved' },
        { name: 'Digest', path: '/digest' },
        { name: 'Settings', path: '/settings' },
        { name: 'Proof', path: '/proof' },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/" className="navbar-logo">
                    Job Notification App
                </NavLink>

                <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                <button
                    className="navbar-toggle"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="hamburger"></span>
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
