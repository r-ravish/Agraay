import React, { useState, useEffect, useCallback } from 'react';
import { ArrowRight, FileText, Plus, TrendingDown, TrendingUp } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const typeColors = {
    'Expense': { bg: 'rgba(239,68,68,0.08)', text: '#ef4444' },
    'Income': { bg: 'rgba(16,185,129,0.08)', text: '#10b981' },
    'Cash Received': { bg: 'rgba(16,185,129,0.08)', text: '#10b981' },
    'Refund': { bg: 'rgba(16,185,129,0.08)', text: '#10b981' },
    'Cashback': { bg: 'rgba(16,185,129,0.08)', text: '#10b981' },
    'Transfer': { bg: 'rgba(99,102,241,0.08)', text: '#6366f1' },
    'Atm Withdrawal': { bg: 'rgba(245,158,11,0.08)', text: '#f59e0b' },
};

const isIncome = (type) => ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(type);

const RecentTransactions = ({ onOpenAddModal, onTransactionsLoaded }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    const fetchTransactions = useCallback(async () => {
        if (currentUser) {
            try {
                setLoading(true);
                const res = await api.get(`/api/transactions?firebaseUid=${currentUser.uid}`);
                setTransactions(res.data);
                if (onTransactionsLoaded) onTransactionsLoaded(res.data);
            } catch (err) {
                console.error('Failed to fetch transactions', err);
            } finally {
                setLoading(false);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Expose refresh function via window for modal to call after save
    useEffect(() => {
        window.__refreshTransactions = fetchTransactions;
        return () => { delete window.__refreshTransactions; };
    }, [fetchTransactions]);

    return (
        <div className="dash-card" style={{ minHeight: '300px' }}>
            <div className="dash-card-header">
                <h2 className="dash-card-title">Latest Transactions</h2>
                <button className="fab-button" onClick={onOpenAddModal} style={{ padding: '0.5rem 1.1rem', fontSize: '0.85rem', borderRadius: '10px' }}>
                    <Plus size={16} /> Add
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '3rem 0', color: '#9ca3af' }}>
                    <div style={{ width: '28px', height: '28px', border: '3px solid #e5e7eb', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
                    <p>Loading transactions...</p>
                </div>
            ) : transactions.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#9ca3af', padding: '3rem 0' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'rgba(99,102,241,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                        <FileText size={28} color="#6366f1" />
                    </div>
                    <p style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151', marginBottom: '0.25rem' }}>No transactions yet</p>
                    <p style={{ fontSize: '0.85rem', marginBottom: '1.5rem' }}>Click "Add" above to record your first transaction</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {transactions.map(tx => {
                        const colors = typeColors[tx.type] || { bg: 'rgba(99,102,241,0.08)', text: '#6366f1' };
                        const income = isIncome(tx.type);
                        return (
                            <div key={tx._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.85rem 1rem', background: '#f9fafb', borderRadius: '14px', border: '1px solid #f3f4f6', transition: 'all 0.15s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {income ? <TrendingUp size={18} color={colors.text} /> : <TrendingDown size={18} color={colors.text} />}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.9rem' }}>{tx.description}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
                                            {tx.account} · {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                                            <span style={{ marginLeft: '6px', background: colors.bg, color: colors.text, padding: '1px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 600 }}>{tx.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: income ? '#10b981' : '#ef4444' }}>
                                    {income ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentTransactions;
