import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

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
                    <a href="/#download" className="btn btn-primary nav-btn">Download Now</a>
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
                    <a href="/#download" className="btn btn-primary mobile-btn" onClick={closeMenu}>
                        Download Now
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
