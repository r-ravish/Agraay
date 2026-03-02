import React from 'react';
import { ArrowRight } from 'lucide-react';

const Partner = () => {
    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'var(--primary-accent)', color: 'var(--primary-dark)', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' }}>
                    Influencer Program
                </div>
                <h1 style={{ fontSize: '3rem', color: 'var(--primary-dark)', marginBottom: '1.5rem', fontWeight: 800 }}>Partner With Us</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.2rem', lineHeight: '1.6' }}>
                    Still hustling for that breakthrough? Join our Influencer Program and grow alongside Agraay.
                </p>

                <div style={{ background: 'white', padding: '3rem', borderRadius: '20px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', textAlign: 'left', border: '1px solid rgba(82, 194, 201, 0.2)' }}>
                    <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>What you get:</h3>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem', fontSize: '1.1rem', color: 'var(--text-main)' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)' }}></div> Early-access perks and beta features</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)' }}></div> Dedicated creative briefs and assets</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)' }}></div> A generous revenue share of every subscription you inspire</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary-light)' }}></div> Co-marketing opportunities on our channels</li>
                    </ul>

                    <h3 style={{ color: 'var(--primary-dark)', fontSize: '1.5rem', marginBottom: '1rem' }}>How to apply:</h3>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.6' }}>
                        If you've got the hunger, we've got the platform. Email us a brief introduction and links to your primary channels. Let's scale together.
                    </p>

                    <a href="mailto:partnerships@agraay.app" className="btn btn-primary btn-large" style={{ display: 'inline-flex', width: 'auto' }}>
                        Apply Now <ArrowRight size={20} style={{ marginLeft: '10px' }} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Partner;
