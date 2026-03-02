import React, { useState, useEffect } from 'react';
import { Search, Filter, Trash2, TrendingDown, TrendingUp, ArrowUpDown } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const typeColors = {
    'Expense': { bg: '#fef2f2', text: '#ef4444', icon: <TrendingDown size={16} /> },
    'Income': { bg: '#ecfdf5', text: '#10b981', icon: <TrendingUp size={16} /> },
    'Cash Received': { bg: '#ecfdf5', text: '#10b981', icon: <TrendingUp size={16} /> },
    'Refund': { bg: '#ecfdf5', text: '#10b981', icon: <TrendingUp size={16} /> },
    'Cashback': { bg: '#ecfdf5', text: '#10b981', icon: <TrendingUp size={16} /> },
    'Transfer': { bg: '#eef2ff', text: '#4f46e5', icon: <ArrowUpDown size={16} /> },
    'Atm Withdrawal': { bg: '#fffbeb', text: '#f59e0b', icon: <TrendingDown size={16} /> },
};

const isIncome = (type) => ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(type);

const TransactionsPage = () => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [deleteId, setDeleteId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            api.get(`/api/transactions?firebaseUid=${currentUser.uid}`)
                .then(res => { setTransactions(res.data); setLoading(false); })
                .catch(() => setLoading(false));
        }
    }, [currentUser]);

    const confirmDelete = async () => {
        if (!deleteId) return;
        setDeleting(true);
        try {
            await api.delete(`/api/transactions/${deleteId}`);
            setTransactions(prev => prev.filter(t => t._id !== deleteId));
        } catch (err) {
            console.error('Failed to delete', err);
        }
        setDeleting(false);
        setDeleteId(null);
    };

    const filtered = transactions.filter(t => {
        const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.account.toLowerCase().includes(search.toLowerCase());
        const matchType = filterType === 'All' || t.type === filterType;
        return matchSearch && matchType;
    });

    const totalIncome = filtered.filter(t => isIncome(t.type)).reduce((s, t) => s + t.amount, 0);
    const totalExpense = filtered.filter(t => !isIncome(t.type)).reduce((s, t) => s + t.amount, 0);

    return (
        <div className="page-container">
            <h1 className="page-title">All Transactions</h1>
            <p className="page-subtitle">Complete history of your finances</p>

            {/* Summary strip */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ flex: 1, background: '#ecfdf5', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <TrendingUp size={20} color="#10b981" />
                    <div>
                        <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Income</div>
                        <div style={{ fontWeight: 700, color: '#10b981', fontSize: '1rem' }}>₹{totalIncome.toLocaleString('en-IN')}</div>
                    </div>
                </div>
                <div style={{ flex: 1, background: '#fef2f2', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <TrendingDown size={20} color="#ef4444" />
                    <div>
                        <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Expenses</div>
                        <div style={{ fontWeight: 700, color: '#ef4444', fontSize: '1rem' }}>₹{totalExpense.toLocaleString('en-IN')}</div>
                    </div>
                </div>
                <div style={{ flex: 1, background: '#eef2ff', borderRadius: '12px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <Filter size={20} color="#4f46e5" />
                    <div>
                        <div style={{ fontSize: '0.72rem', color: '#6b7280' }}>Showing</div>
                        <div style={{ fontWeight: 700, color: '#4f46e5', fontSize: '1rem' }}>{filtered.length} records</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input type="text" placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', padding: '0.7rem 0.85rem 0.7rem 2.5rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '0.85rem', outline: 'none', fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box' }}
                    />
                </div>
                <select value={filterType} onChange={e => setFilterType(e.target.value)}
                    style={{ padding: '0.7rem 0.85rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '0.85rem', fontFamily: 'inherit', background: '#fff', cursor: 'pointer', minWidth: '140px' }}>
                    <option value="All">All Types</option>
                    <option value="Expense">Expense</option>
                    <option value="Income">Income</option>
                    <option value="Transfer">Transfer</option>
                    <option value="Atm Withdrawal">Atm Withdrawal</option>
                    <option value="Cash Received">Cash Received</option>
                </select>
            </div>

            {/* Transaction List */}
            {loading ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: '#9ca3af' }}>
                    <div style={{ width: '28px', height: '28px', border: '2.5px solid #e5e7eb', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 0.75rem' }}></div>
                    Loading...
                </div>
            ) : filtered.length === 0 ? (
                <div className="dash-card" style={{ textAlign: 'center', padding: '2.5rem', color: '#9ca3af' }}>
                    <p style={{ fontWeight: 600, color: '#374151', fontSize: '1rem' }}>No transactions found</p>
                    <p style={{ fontSize: '0.82rem' }}>Try adjusting your search or filters</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {filtered.map((tx, i) => {
                        const colors = typeColors[tx.type] || { bg: '#eef2ff', text: '#4f46e5', icon: <ArrowUpDown size={16} /> };
                        const income = isIncome(tx.type);
                        return (
                            <div key={tx._id} className="tx-row" style={{ animationDelay: `${i * 0.02}s` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text }}>
                                        {colors.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.88rem' }}>{tx.description}</div>
                                        <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '1px' }}>
                                            {tx.account} · {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            <span style={{ marginLeft: '6px', background: colors.bg, color: colors.text, padding: '1px 6px', borderRadius: '5px', fontSize: '0.68rem', fontWeight: 700 }}>{tx.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontWeight: 700, fontSize: '0.95rem', color: income ? '#10b981' : '#ef4444' }}>
                                        {income ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                                    </span>
                                    <button onClick={() => setDeleteId(tx._id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '7px', padding: '5px', cursor: 'pointer', display: 'flex', color: '#ef4444', transition: 'all 0.15s' }}
                                        title="Delete">
                                        <Trash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Custom Delete Confirm Dialog */}
            {deleteId && (
                <div className="confirm-overlay" onClick={(e) => { if (e.target === e.currentTarget) setDeleteId(null); }}>
                    <div className="confirm-dialog">
                        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                            <Trash2 size={24} color="#ef4444" />
                        </div>
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.1rem', fontWeight: 700, color: '#111827' }}>Delete Transaction?</h3>
                        <p style={{ margin: '0 0 1.5rem', fontSize: '0.85rem', color: '#6b7280' }}>This action cannot be undone.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                            <button onClick={() => setDeleteId(null)}
                                style={{ padding: '0.65rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', fontWeight: 600, color: '#6b7280', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}>
                                Cancel
                            </button>
                            <button onClick={confirmDelete} disabled={deleting}
                                style={{ padding: '0.65rem', borderRadius: '10px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 600, cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', opacity: deleting ? 0.7 : 1 }}>
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
