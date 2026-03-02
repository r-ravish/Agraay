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

    useEffect(() => {
        if (currentUser) {
            setLoading(true);
            api.get(`/api/transactions?firebaseUid=${currentUser.uid}`)
                .then(res => { setTransactions(res.data); setLoading(false); })
                .catch(() => setLoading(false));
        }
    }, [currentUser]);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this transaction?')) return;
        try {
            await api.delete(`/api/transactions/${id}`);
            setTransactions(prev => prev.filter(t => t._id !== id));
        } catch (err) {
            console.error('Failed to delete', err);
        }
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
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ flex: 1, background: '#ecfdf5', borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <TrendingUp size={22} color="#10b981" />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Income</div>
                        <div style={{ fontWeight: 800, color: '#10b981', fontSize: '1.1rem' }}>₹{totalIncome.toLocaleString('en-IN')}</div>
                    </div>
                </div>
                <div style={{ flex: 1, background: '#fef2f2', borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <TrendingDown size={22} color="#ef4444" />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Expenses</div>
                        <div style={{ fontWeight: 800, color: '#ef4444', fontSize: '1.1rem' }}>₹{totalExpense.toLocaleString('en-IN')}</div>
                    </div>
                </div>
                <div style={{ flex: 1, background: '#eef2ff', borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Filter size={22} color="#4f46e5" />
                    <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Showing</div>
                        <div style={{ fontWeight: 800, color: '#4f46e5', fontSize: '1.1rem' }}>{filtered.length} records</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                    <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
                    <input type="text" placeholder="Search transactions..." value={search} onChange={e => setSearch(e.target.value)}
                        style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.75rem', borderRadius: '14px', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none', fontFamily: 'inherit', background: '#fff', boxSizing: 'border-box' }}
                    />
                </div>
                <select value={filterType} onChange={e => setFilterType(e.target.value)}
                    style={{ padding: '0.8rem 1rem', borderRadius: '14px', border: '1.5px solid #e5e7eb', fontSize: '0.88rem', fontFamily: 'inherit', background: '#fff', cursor: 'pointer', minWidth: '150px' }}>
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
                <div style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <div style={{ width: '32px', height: '32px', border: '3px solid #e5e7eb', borderTopColor: '#4f46e5', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem' }}></div>
                    Loading...
                </div>
            ) : filtered.length === 0 ? (
                <div className="dash-card" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <p style={{ fontWeight: 600, color: '#374151', fontSize: '1.05rem' }}>No transactions found</p>
                    <p style={{ fontSize: '0.85rem' }}>Try adjusting your search or filters</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {filtered.map((tx, i) => {
                        const colors = typeColors[tx.type] || { bg: '#eef2ff', text: '#4f46e5', icon: <ArrowUpDown size={16} /> };
                        const income = isIncome(tx.type);
                        return (
                            <div key={tx._id} className="tx-row" style={{ animationDelay: `${i * 0.03}s` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                                    <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text }}>
                                        {colors.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.92rem' }}>{tx.description}</div>
                                        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '2px' }}>
                                            {tx.account} · {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            <span style={{ marginLeft: '8px', background: colors.bg, color: colors.text, padding: '2px 8px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 700 }}>{tx.type}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <span style={{ fontWeight: 800, fontSize: '1rem', color: income ? '#10b981' : '#ef4444' }}>
                                        {income ? '+' : '-'} ₹{tx.amount.toLocaleString('en-IN')}
                                    </span>
                                    <button onClick={() => handleDelete(tx._id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '6px', cursor: 'pointer', display: 'flex', color: '#ef4444', transition: 'all 0.2s' }}
                                        title="Delete">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default TransactionsPage;
