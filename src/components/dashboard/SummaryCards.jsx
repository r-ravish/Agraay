import React from 'react';
import { ArrowRight, Wallet, Building2, Clock, Upload, Cloud, Users } from 'lucide-react';

const SummaryCards = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Top Row Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="dash-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Wallet size={24} color="#4ade80" />
                        <div>
                            <div style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>Cash In Hand</div>
                            <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>₹ 0</div>
                        </div>
                    </div>
                    <ArrowRight size={18} color="#94a3b8" />
                </div>

                <div className="dash-card" style={{ padding: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Building2 size={24} color="#60a5fa" />
                        <div style={{ fontSize: '0.9rem', color: '#e2e8f0', fontWeight: 600 }}>Accounts</div>
                    </div>
                    <ArrowRight size={18} color="#94a3b8" />
                </div>
            </div>

            {/* Bills Due Component */}
            <div className="dash-card">
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Bills Due</h2>
                    <button className="icon-btn" style={{ background: 'transparent', border: 'none' }}><ArrowRight size={20} color="#a0a0a0" /></button>
                </div>
                <div style={{ padding: '2rem 0', textAlign: 'center', color: '#64748b' }}>
                    <Clock size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>No bills available</p>
                    <button style={{ background: 'rgba(255,255,255,0.05)', color: '#d946ef', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem', borderRadius: '10px', width: '100%', cursor: 'pointer' }}>
                        + Add bill
                    </button>
                </div>
            </div>

            {/* Budgets Component */}
            <div className="dash-card">
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Budgets</h2>
                    <button className="icon-btn" style={{ background: 'transparent', border: 'none' }}><ArrowRight size={20} color="#a0a0a0" /></button>
                </div>
                <div style={{ padding: '2rem 0', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ width: '40px', height: '40px', border: '3px solid #334155', borderTopColor: 'transparent', borderRadius: '50%', margin: '0 auto 1rem', transform: 'rotate(-45deg)' }}></div>
                    <p style={{ fontSize: '1rem', color: '#e2e8f0', fontWeight: 600, marginBottom: '0.5rem' }}>Budget Disabled</p>
                    <p style={{ fontSize: '0.8rem' }}>Enable budgets to track spending</p>
                </div>
            </div>

            {/* Control Center */}
            <div className="dash-card">
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Control Center</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center', marginTop: '1.5rem' }}>
                    <div>
                        <button style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                            <Upload size={20} />
                        </button>
                        <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Import</span>
                    </div>
                    <div>
                        <button style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                            <Cloud size={20} />
                        </button>
                        <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Backup</span>
                    </div>
                    <div>
                        <button style={{ width: '50px', height: '50px', borderRadius: '15px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem' }}>
                            <Users size={20} />
                        </button>
                        <span style={{ fontSize: '0.8rem', color: '#e2e8f0' }}>Sync with Family</span>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SummaryCards;
