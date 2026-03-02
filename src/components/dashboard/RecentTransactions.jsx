import React, { useState, useEffect, useCallback } from 'react';
import { Plus, TrendingDown, TrendingUp, Trash2 } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const typeColors = {
    'Expense': { bg: '#fef2f2', text: '#ef4444' },
    'Income': { bg: '#ecfdf5', text: '#10b981' },
    'Cash Received': { bg: '#ecfdf5', text: '#10b981' },
    'Refund': { bg: '#ecfdf5', text: '#10b981' },
    'Cashback': { bg: '#ecfdf5', text: '#10b981' },
    'Transfer': { bg: '#eef2ff', text: '#6366f1' },
    'Atm Withdrawal': { bg: '#fffbeb', text: '#f59e0b' },
};

const isIncome = (type) => ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(type);

const RecentTransactions = ({ onOpenAddModal, onTransactionsLoaded }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);
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

    useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

    useEffect(() => {
        window.__refreshTransactions = fetchTransactions;
        return () => { delete window.__refreshTransactions; };
    }, [fetchTransactions]);

    const handleDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            await api.delete(`/api/transactions/${deleteId}`);
            setTransactions(prev => prev.filter(t => t._id !== deleteId));
            if (onTransactionsLoaded) {
                onTransactionsLoaded(prev => prev.filter(t => t._id !== deleteId));
            }
            // Also refresh full list
            await fetchTransactions();
        } catch (err) {
            console.error('Failed to delete', err);
        }
        setDeleting(false);
        setDeleteId(null);
    };

    // Show only latest 5 on dashboard
    const recent = transactions.slice(0, 5);

    return (
        <>
            <div className="dash-card" style={{ animationDelay: '0.25s' }}>
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Latest Transactions</h2>
                    <button className="fab-button" onClick={onOpenAddModal} style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', borderRadius: '8px' }}>
                        <Plus size={14} /> Add
                    </button>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0', color: '#9ca3af' }}>
                        <div style={{ width: '24px', height: '24px', border: '2.5px solid #e5e7eb', borderTopColor: '#6366f1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 0.75rem' }}></div>
                        Loading...
                    </div>
                ) : recent.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#9ca3af', padding: '1.5rem 0', fontSize: '0.85rem' }}>
                        No transactions yet — add one above
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        {recent.map(tx => {
                            const colors = typeColors[tx.type] || { bg: '#eef2ff', text: '#6366f1' };
                            const income = isIncome(tx.type);
                            return (
                                <div key={tx._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.75rem', background: '#fafafe', borderRadius: '10px', border: '1px solid #f3f4f6' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                                        <div style={{ width: '34px', height: '34px', borderRadius: '9px', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            {income ? <TrendingUp size={15} color={colors.text} /> : <TrendingDown size={15} color={colors.text} />}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.85rem' }}>{tx.description}</div>
                                            <div style={{ fontSize: '0.7rem', color: '#9ca3af' }}>{tx.account}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: income ? '#10b981' : '#ef4444' }}>
                                            {income ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                                        </span>
                                        <button onClick={() => setDeleteId(tx._id)} title="Delete"
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#d1d5db', transition: 'color 0.15s' }}
                                            onMouseEnter={e => e.target.style.color = '#ef4444'}
                                            onMouseLeave={e => e.target.style.color = '#d1d5db'}>
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Bottom CTA */}
                <button onClick={onOpenAddModal}
                    style={{ width: '100%', marginTop: '0.75rem', padding: '0.6rem', borderRadius: '10px', border: 'none', background: '#4f46e5', color: 'white', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'inherit' }}>
                    + Add Transaction
                </button>
            </div>

            {/* Custom Delete Confirm Dialog */}
            {deleteId && (
                <div className="confirm-overlay" onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null); }}>
                    <div className="confirm-dialog">
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                            <Trash2 size={24} color="#ef4444" />
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>Delete Transaction?</h3>
                        <p style={{ margin: '0 0 1.5rem', fontSize: '0.88rem', color: '#6b7280' }}>This action cannot be undone.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                            <button onClick={() => setDeleteId(null)}
                                style={{ padding: '0.7rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', fontWeight: 600, color: '#6b7280', cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'inherit' }}>
                                Cancel
                            </button>
                            <button onClick={handleDelete} disabled={deleting}
                                style={{ padding: '0.7rem', borderRadius: '10px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem', fontFamily: 'inherit', opacity: deleting ? 0.7 : 1 }}>
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RecentTransactions;
