import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ec4899', '#7c3aed', '#06b6d4', '#ef4444', '#f97316', '#14b8a6', '#8b5cf6'];

const BudgetPage = () => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem('agraay_budgets');
        return saved ? JSON.parse(saved) : [];
    });
    const [showAdd, setShowAdd] = useState(false);
    const [newCat, setNewCat] = useState('');
    const [newLimit, setNewLimit] = useState('');
    const [editId, setEditId] = useState(null);
    const [editLimit, setEditLimit] = useState('');

    useEffect(() => {
        if (currentUser) {
            api.get(`/api/transactions?firebaseUid=${currentUser.uid}`)
                .then(res => {
                    setTransactions(res.data);
                    // Auto-generate budget categories from real transaction descriptions if no budgets exist
                    const saved = localStorage.getItem('agraay_budgets');
                    if (!saved || JSON.parse(saved).length === 0) {
                        autoGenerateBudgets(res.data);
                    }
                })
                .catch(() => { });
        }
    }, [currentUser]);

    const autoGenerateBudgets = (txns) => {
        // Group expenses by description to create dynamic categories
        const expenseTxns = txns.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type));
        if (expenseTxns.length === 0) return;

        const categoryMap = {};
        expenseTxns.forEach(tx => {
            const cat = tx.description.trim();
            if (!categoryMap[cat]) {
                categoryMap[cat] = { total: 0, count: 0 };
            }
            categoryMap[cat].total += tx.amount;
            categoryMap[cat].count += 1;
        });

        // Create budgets: set limit as 1.5x the current spend (rounded up)
        const autoBudgets = Object.entries(categoryMap).map(([cat, data], i) => ({
            id: Date.now() + i,
            category: cat,
            limit: Math.ceil((data.total * 1.5) / 500) * 500, // Round up to nearest 500
            color: COLORS[i % COLORS.length],
        }));

        setBudgets(autoBudgets);
        localStorage.setItem('agraay_budgets', JSON.stringify(autoBudgets));
    };

    useEffect(() => {
        localStorage.setItem('agraay_budgets', JSON.stringify(budgets));
    }, [budgets]);

    const getSpent = (category) => {
        // Match by exact description (case-insensitive)
        return transactions
            .filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type) &&
                t.description.toLowerCase() === category.toLowerCase())
            .reduce((s, t) => s + t.amount, 0);
    };

    const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
    const totalSpent = budgets.reduce((s, b) => s + getSpent(b.category), 0);

    const addBudget = () => {
        if (!newCat || !newLimit) return;
        setBudgets(prev => [...prev, {
            id: Date.now(),
            category: newCat,
            limit: parseFloat(newLimit),
            color: COLORS[prev.length % COLORS.length]
        }]);
        setNewCat('');
        setNewLimit('');
        setShowAdd(false);
    };

    const deleteBudget = (id) => {
        setBudgets(prev => prev.filter(b => b.id !== id));
    };

    const startEdit = (budget) => {
        setEditId(budget.id);
        setEditLimit(String(budget.limit));
    };

    const saveEdit = (id) => {
        if (!editLimit) return;
        setBudgets(prev => prev.map(b => b.id === id ? { ...b, limit: parseFloat(editLimit) } : b));
        setEditId(null);
        setEditLimit('');
    };

    const resetBudgets = () => {
        autoGenerateBudgets(transactions);
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h1 className="page-title">Budget Planner</h1>
                    <p className="page-subtitle">Auto-generated from your transactions — edit limits as needed</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={resetBudgets} style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', background: '#fff', fontWeight: 600, color: '#6b7280', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit' }}>
                        ↻ Refresh
                    </button>
                    <button className="fab-button" onClick={() => setShowAdd(!showAdd)} style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>
                        <Plus size={16} /> Add Budget
                    </button>
                </div>
            </div>

            {/* Add Budget Form */}
            {showAdd && (
                <div className="dash-card" style={{ marginBottom: '1.25rem', background: '#f5f3ff', border: '1.5px solid #c7d2fe' }}>
                    <h3 style={{ fontWeight: 700, color: '#1e1b4b', marginBottom: '0.75rem', fontSize: '0.95rem' }}>New Budget Category</h3>
                    <div style={{ display: 'flex', gap: '0.6rem' }}>
                        <input type="text" placeholder="Category name" value={newCat} onChange={e => setNewCat(e.target.value)}
                            style={{ flex: 1, padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none' }}
                        />
                        <input type="number" placeholder="Monthly limit (₹)" value={newLimit} onChange={e => setNewLimit(e.target.value)}
                            style={{ width: '170px', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1.5px solid #e5e7eb', fontSize: '0.88rem', fontFamily: 'inherit', outline: 'none' }}
                        />
                        <button onClick={addBudget} style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: '#4f46e5', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.88rem' }}>
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: 'white' }}>
                    <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem' }}>Total Budget</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{totalBudget.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.25rem' }}>{budgets.length} categories</div>
                </div>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', border: 'none', color: 'white' }}>
                    <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem' }}>Total Spent</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{totalSpent.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.25rem' }}>{totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(0) : 0}% used</div>
                </div>
                <div className="dash-card" style={{ background: totalBudget - totalSpent >= 0 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: 'white' }}>
                    <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem' }}>Remaining</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{Math.abs(totalBudget - totalSpent).toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.25rem' }}>{totalBudget - totalSpent >= 0 ? 'Under budget ✓' : 'Over budget ✗'}</div>
                </div>
            </div>

            {/* Budget Cards */}
            {budgets.length === 0 ? (
                <div className="dash-card" style={{ textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>
                    <p style={{ fontWeight: 600, color: '#374151', fontSize: '1.05rem', marginBottom: '0.25rem' }}>No budgets yet</p>
                    <p style={{ fontSize: '0.85rem' }}>Add some transactions first and budgets will be auto-generated, or click "Add Budget" above.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {budgets.map(budget => {
                        const spent = getSpent(budget.category);
                        const pct = budget.limit > 0 ? Math.min((spent / budget.limit) * 100, 100) : 0;
                        const over = spent > budget.limit;
                        const isEditing = editId === budget.id;

                        return (
                            <div key={budget.id} className="dash-card" style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                        <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: budget.color }}></div>
                                        <span style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>{budget.category}</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        {isEditing ? (
                                            <>
                                                <button onClick={() => saveEdit(budget.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#10b981', padding: '4px' }} title="Save">
                                                    <Save size={14} />
                                                </button>
                                                <button onClick={() => setEditId(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '4px' }} title="Cancel">
                                                    <X size={14} />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(budget)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', padding: '4px' }} title="Edit limit">
                                                    <Edit3 size={13} />
                                                </button>
                                                <button onClick={() => deleteBudget(budget.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', padding: '4px' }} title="Delete">
                                                    <Trash2 size={13} />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.82rem' }}>
                                    <span style={{ color: '#6b7280' }}>₹{spent.toLocaleString('en-IN')} spent</span>
                                    {isEditing ? (
                                        <input type="number" value={editLimit} onChange={e => setEditLimit(e.target.value)} autoFocus
                                            style={{ width: '100px', padding: '2px 6px', borderRadius: '6px', border: '1.5px solid #c7d2fe', fontSize: '0.82rem', fontFamily: 'inherit', outline: 'none', textAlign: 'right' }}
                                        />
                                    ) : (
                                        <span style={{ color: '#6b7280' }}>₹{budget.limit.toLocaleString('en-IN')} limit</span>
                                    )}
                                </div>

                                <div className="budget-bar-track">
                                    <div className="budget-bar-fill" style={{ width: `${pct}%`, background: over ? '#ef4444' : budget.color }}></div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.75rem' }}>
                                    <span style={{ fontWeight: 700, color: over ? '#ef4444' : budget.color }}>{pct.toFixed(0)}% used</span>
                                    <span style={{ color: over ? '#ef4444' : '#10b981', fontWeight: 600 }}>
                                        {over ? `₹${(spent - budget.limit).toLocaleString('en-IN')} over` : `₹${(budget.limit - spent).toLocaleString('en-IN')} left`}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default BudgetPage;
