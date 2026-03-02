import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { currentUser } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    const navLinks = [
        { name: 'Home', path: '/#home' },
        { name: 'About', path: '/#how' },
        { name: 'Services', path: '/#features' },
        { name: 'Pricing', path: '/#pricing' },
        { name: 'Mail Us', path: '/#mail' },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">
                <Link to="/" className="nav-logo" onClick={closeMenu}>
                    <Logo width={80} />
                </Link>

                {/* Desktop Menu */}
                <div className="nav-menu">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.path}
                            className="nav-link"
                        >
                            {link.name}
                        </a>
                    ))}
                    {currentUser ? (
                        <Link to="/dashboard" className="btn btn-primary nav-btn">Dashboard</Link>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                            <Link to="/login" className="btn btn-outline nav-btn">Log In</Link>
                            <Link to="/signup" className="btn btn-primary nav-btn">Get Started</Link>
                        </div>
                    )}
                </div>

                {/* Mobile menu toggle */}
                <div className="mobile-toggle" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                <div className="mobile-menu-inner">
                    {navLinks.map((link, index) => (
                        <a
                            key={index}
                            href={link.path}
                            className="mobile-link"
                            onClick={closeMenu}
                        >
                            {link.name}
                        </a>
                    ))}
                    {currentUser ? (
                        <Link to="/dashboard" className="btn btn-primary mobile-btn" onClick={closeMenu}>Dashboard</Link>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-outline mobile-btn" onClick={closeMenu}>Log In</Link>
                            <Link to="/signup" className="btn btn-primary mobile-btn" onClick={closeMenu}>Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
