import React from 'react';

const Privacy = () => {
    const currentYear = new Date().getFullYear();

    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem', fontWeight: 800 }}>Privacy Policy</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Last Updated: January 1, {currentYear}</p>

                <div className="legal-content" style={{ color: 'var(--text-main)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Our Privacy Commitment</h2>
                        <p>At Agraay, we believe your financial data belongs to you. We differentiate ourselves by setting the highest privacy standards across the industry. We do not sell your personal data.</p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Data Processing</h2>
                        <p>Agraay processes your SMS transaction alerts and app notifications locally on your device to categorize expenses. Transaction details stay on your device unless you explicitly enable cloud backup features.</p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Information We Collect</h2>
                        <p>We only collect minimal diagnostic and crash data (such as app version and device model) to improve app stability, unless you opt out. Payment details for subscriptions are handled securely by Google Play or the Apple App Store.</p>
                    </section>

                    <section>
                        <h2 style={{ color: 'var(--primary-dark)', marginBottom: '1rem' }}>Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at support@agraay.app.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
