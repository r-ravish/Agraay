import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh', textAlign: 'center' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '1rem', fontWeight: 800 }}>Agraay Blog</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem' }}>Financial insights, app updates, and tips to manage your budget better.</p>

                <div style={{ background: 'var(--bg-light)', padding: '4rem', borderRadius: '20px', border: '1px dashed rgba(82, 194, 201, 0.5)' }}>
                    <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Coming Soon</h2>
                    <p style={{ color: 'var(--text-main)', marginBottom: '2rem' }}>We're working on some great content for you. Check back later!</p>
                    <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <ArrowLeft size={18} /> Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Blog;
