import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Target } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../contexts/AuthContext';

const DEFAULT_BUDGETS = [
    { id: 1, category: 'Groceries', limit: 5000, color: '#10b981' },
    { id: 2, category: 'Transport', limit: 3000, color: '#f59e0b' },
    { id: 3, category: 'Entertainment', limit: 2000, color: '#ec4899' },
    { id: 4, category: 'Bills & Utilities', limit: 8000, color: '#6366f1' },
    { id: 5, category: 'Shopping', limit: 4000, color: '#7c3aed' },
    { id: 6, category: 'Health', limit: 2500, color: '#06b6d4' },
];

const BudgetPage = () => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState(() => {
        const saved = localStorage.getItem('agraay_budgets');
        return saved ? JSON.parse(saved) : DEFAULT_BUDGETS;
    });
    const [showAdd, setShowAdd] = useState(false);
    const [newCat, setNewCat] = useState('');
    const [newLimit, setNewLimit] = useState('');

    useEffect(() => {
        if (currentUser) {
            api.get(`/api/transactions?firebaseUid=${currentUser.uid}`)
                .then(res => setTransactions(res.data))
                .catch(() => { });
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('agraay_budgets', JSON.stringify(budgets));
    }, [budgets]);

    const getSpent = (category) => {
        return transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type) && t.description.toLowerCase().includes(category.toLowerCase())).reduce((s, t) => s + t.amount, 0);
    };

    const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
    const totalSpent = budgets.reduce((s, b) => s + getSpent(b.category), 0);

    const addBudget = () => {
        if (!newCat || !newLimit) return;
        const colors = ['#10b981', '#f59e0b', '#ec4899', '#6366f1', '#7c3aed', '#06b6d4', '#ef4444', '#f97316'];
        setBudgets(prev => [...prev, { id: Date.now(), category: newCat, limit: parseFloat(newLimit), color: colors[prev.length % colors.length] }]);
        setNewCat('');
        setNewLimit('');
        setShowAdd(false);
    };

    const deleteBudget = (id) => {
        setBudgets(prev => prev.filter(b => b.id !== id));
    };

    return (
        <div className="page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                    <h1 className="page-title">Budget Planner</h1>
                    <p className="page-subtitle">Set limits and track your spending</p>
                </div>
                <button className="fab-button" onClick={() => setShowAdd(!showAdd)} style={{ padding: '0.6rem 1.25rem', fontSize: '0.88rem' }}>
                    <Plus size={16} /> Add Budget
                </button>
            </div>

            {/* Add Budget Form */}
            {showAdd && (
                <div className="dash-card" style={{ marginBottom: '1.5rem', background: '#f5f3ff', border: '1.5px solid #c7d2fe' }}>
                    <h3 style={{ fontWeight: 700, color: '#1e1b4b', marginBottom: '1rem', fontSize: '0.95rem' }}>New Budget Category</h3>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <input type="text" placeholder="Category name" value={newCat} onChange={e => setNewCat(e.target.value)}
                            style={{ flex: 1, padding: '0.7rem 1rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
                        />
                        <input type="number" placeholder="Monthly limit (₹)" value={newLimit} onChange={e => setNewLimit(e.target.value)}
                            style={{ width: '180px', padding: '0.7rem 1rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '0.9rem', fontFamily: 'inherit', outline: 'none' }}
                        />
                        <button onClick={addBudget} style={{ padding: '0.7rem 1.5rem', borderRadius: '12px', background: '#4f46e5', color: 'white', border: 'none', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                            Save
                        </button>
                    </div>
                </div>
            )}

            {/* Overview Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: 'white' }}>
                    <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem' }}>Total Budget</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{totalBudget.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.25rem' }}>{budgets.length} categories</div>
                </div>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #f97316)', border: 'none', color: 'white' }}>
                    <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem' }}>Total Spent</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{totalSpent.toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.25rem' }}>{((totalSpent / totalBudget) * 100 || 0).toFixed(0)}% used</div>
                </div>
                <div className="dash-card" style={{ background: totalBudget - totalSpent >= 0 ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: 'white' }}>
                    <div style={{ fontSize: '0.78rem', opacity: 0.7, marginBottom: '0.5rem' }}>Remaining</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>₹{Math.abs(totalBudget - totalSpent).toLocaleString('en-IN')}</div>
                    <div style={{ fontSize: '0.78rem', opacity: 0.6, marginTop: '0.25rem' }}>{totalBudget - totalSpent >= 0 ? 'Under budget ✓' : 'Over budget ✗'}</div>
                </div>
            </div>

            {/* Budget Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {budgets.map(budget => {
                    const spent = getSpent(budget.category);
                    const pct = Math.min((spent / budget.limit) * 100, 100);
                    const over = spent > budget.limit;

                    return (
                        <div key={budget.id} className="dash-card" style={{ position: 'relative' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: budget.color }}></div>
                                    <span style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>{budget.category}</span>
                                </div>
                                <button onClick={() => deleteBudget(budget.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d1d5db', padding: '4px' }}>
                                    <Trash2 size={14} />
                                </button>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.82rem' }}>
                                <span style={{ color: '#6b7280' }}>₹{spent.toLocaleString('en-IN')} spent</span>
                                <span style={{ color: '#6b7280' }}>₹{budget.limit.toLocaleString('en-IN')} limit</span>
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
        </div>
    );
};

export default BudgetPage;
