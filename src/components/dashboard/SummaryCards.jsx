import React from 'react';
import { ArrowRight, Wallet, Building2, Clock, Upload, Cloud, Users, PieChart } from 'lucide-react';

const SummaryCards = ({ transactions }) => {
    const cashIn = transactions ? transactions.filter(t => t.type === 'Income' || t.type === 'Cash Received' || t.type === 'Cashback' || t.type === 'Refund').reduce((s, t) => s + t.amount, 0) : 0;
    const totalExpenses = transactions ? transactions.filter(t => t.type === 'Expense' || t.type === 'Atm Withdrawal').reduce((s, t) => s + t.amount, 0) : 0;
    const balance = cashIn - totalExpenses;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="stat-mini-card">
                    <div>
                        <div className="stat-mini-label">Cash In Hand</div>
                        <div className="stat-mini-value">₹{cashIn.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="stat-mini-icon" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                        <Wallet size={20} color="#10b981" />
                    </div>
                </div>
                <div className="stat-mini-card">
                    <div>
                        <div className="stat-mini-label">Expenses</div>
                        <div className="stat-mini-value" style={{ color: '#ef4444' }}>₹{totalExpenses.toLocaleString('en-IN')}</div>
                    </div>
                    <div className="stat-mini-icon" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
                        <PieChart size={20} color="#ef4444" />
                    </div>
                </div>
            </div>

            {/* Net Balance */}
            <div className="dash-card" style={{ background: balance >= 0 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: 'white' }}>
                <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.5rem', fontWeight: 500 }}>Net Balance</div>
                <div style={{ fontSize: '2rem', fontWeight: 800 }}>₹{Math.abs(balance).toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem' }}>{balance >= 0 ? '↑ You\'re saving well!' : '↓ Expenses exceed income'}</div>
            </div>

            {/* Bills Due */}
            <div className="dash-card">
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Bills Due</h2>
                    <button className="icon-btn"><ArrowRight size={18} color="#6b7280" /></button>
                </div>
                <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#9ca3af' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(99,102,241,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                        <Clock size={24} color="#6366f1" />
                    </div>
                    <p style={{ margin: '0 0 1rem', fontSize: '0.85rem' }}>No bills added yet</p>
                    <button style={{ background: 'rgba(99,102,241,0.08)', color: '#6366f1', border: '1px solid rgba(99,102,241,0.2)', padding: '0.6rem 1.2rem', borderRadius: '10px', width: '100%', cursor: 'pointer', fontWeight: 600, fontSize: '0.87rem' }}>
                        + Add Bill
                    </button>
                </div>
            </div>

            {/* Control Center */}
            <div className="dash-card">
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Control Center</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '0.5rem' }}>
                    {[{ icon: <Upload size={18} />, label: 'Import', color: '#6366f1' }, { icon: <Cloud size={18} />, label: 'Backup', color: '#8b5cf6' }, { icon: <Users size={18} />, label: 'Family', color: '#10b981' }].map(item => (
                        <div key={item.label} style={{ textAlign: 'center' }}>
                            <button style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.12)', color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}>
                                {item.icon}
                            </button>
                            <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default SummaryCards;
