import React from 'react';

const Terms = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem', fontWeight: 800 }}>Terms of Service</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last Updated: January 1, {currentYear}</p>

                <div className="legal-content" style={{ color: 'var(--text-main)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
                        <p>By accessing and using Agraay ("the App" or "Service"), you accept and agree to be bound by the terms and provision of this agreement.</p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>2. Description of Service</h2>
                        <p>Agraay provides a personal finance management tool that categorizes expenses based on SMS and notifications. We do not access your bank accounts directly.</p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>3. Privacy and Data</h2>
                        <p>Your privacy is important to us. Our Privacy Policy governs how we collect, use, and protect your information. By using Agraay, you consent to our data practices as outlined in the Privacy Policy.</p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>4. Subscriptions</h2>
                        <p>After the 5-day free trial, continued use requires a paid subscription. Prices are subject to change but adjustments will not affect active periods. Payments are processed securely via platform app stores.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Terms;
