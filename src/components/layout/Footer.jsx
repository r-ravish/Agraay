import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../common/Logo';
import './Footer.css';
import { Mail, MessageCircle, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer" id="mail">
            <div className="container footer-container">

                <div className="footer-top">
                    <div className="footer-brand">
                        <Logo width={80} />
                        <p className="footer-description">
                            Agraay is a premium, AI-powered app that automatically reads your SMS and bank notifications to categorize transactions in seconds. Financial Foresight, automated.
                        </p>
                        <div className="footer-contact-actions">
                            <a href="mailto:support@agraay.app" className="contact-link">
                                <Mail size={18} />
                                support@agraay.app
                            </a>
                            <a href="#chat" className="contact-link chat-link">
                                <MessageCircle size={18} />
                                Talk to us live
                            </a>
                        </div>
                    </div>

                    <div className="footer-links-wrapper">
                        <div className="footer-links-col">
                            <h3>Company</h3>
                            <ul>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/partner">Partner With Us</Link></li>
                                <li><Link to="/blog">Blog</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links-col">
                            <h3>Resources (Android)</h3>
                            <ul>
                                <li><Link to="/faq">FAQ</Link></li>
                                <li><Link to="/terms">Terms of Service</Link></li>
                                <li><Link to="/privacy">Privacy Policy</Link></li>
                            </ul>
                        </div>

                        <div className="footer-links-col">
                            <h3>Resources (iOS)</h3>
                            <ul>
                                <li><Link to="/ios/faq">FAQ</Link></li>
                                <li><Link to="/ios/terms">Terms of Service</Link></li>
                                <li><Link to="/ios/privacy">Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        Copyright &copy; {currentYear} Agraay Software by Agraay PRIVATE LIMITED. All rights reserved.
                    </p>
                    <p className="made-with-love">
                        Crafted with <Heart size={14} color="#ff4b4b" fill="#ff4b4b" /> for better financial futures.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
