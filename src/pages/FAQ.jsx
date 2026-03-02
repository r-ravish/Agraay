import React from 'react';

const FAQ = () => {
    return (
        <div className="page-container" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '80vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <h1 style={{ fontSize: '2.5rem', color: 'var(--primary-dark)', marginBottom: '1rem', fontWeight: 800 }}>Frequently Asked Questions</h1>
                <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem' }}>Find answers to common questions about Agraay.</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {[
                        { q: "Is Agraay free to use?", a: "Agraay is free to download and try for 5 days. After the trial, there is a nominal subscription fee based on your region for unlimited ad-free tracking." },
                        { q: "How secure is my data?", a: "Extremely secure. Your data never leaves your device. We use a local-first approach to ensure complete privacy. We don't sell data to third parties." },
                        { q: "Does Agraay need my bank passwords?", a: "No. Agraay automatically categorizes transactions entirely based on SMS alerts and notifications you already receive from your bank." },
                        { q: "Can I manually add expenses?", a: "Yes, you can easily add, edit, or delete expenses manually to keep your budget perfectly accurate." }
                    ].map((item, index) => (
                        <div key={index} style={{ padding: '1.5rem', background: 'white', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 5px 15px rgba(0,0,0,0.02)' }}>
                            <h3 style={{ color: 'var(--primary-dark)', marginBottom: '0.8rem', fontSize: '1.2rem' }}>{item.q}</h3>
                            <p style={{ color: 'var(--text-main)', lineHeight: '1.6' }}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
