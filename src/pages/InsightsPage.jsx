import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Zap, Target, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const InsightsPage = () => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (currentUser) {
            api.get(`/api/transactions?firebaseUid=${currentUser.uid}`)
                .then(res => setTransactions(res.data))
                .catch(() => { });
        }
    }, [currentUser]);

    const incomeTotal = transactions.filter(t => ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(t.type)).reduce((s, t) => s + t.amount, 0);
    const expenseTotal = transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type)).reduce((s, t) => s + t.amount, 0);
    const savingsRate = incomeTotal > 0 ? ((incomeTotal - expenseTotal) / incomeTotal * 100).toFixed(1) : 0;
    const avgExpense = transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type)).length > 0 ? Math.round(expenseTotal / transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type)).length) : 0;

    // Top spending categories
    const catMap = {};
    transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type)).forEach(t => {
        catMap[t.account] = (catMap[t.account] || 0) + t.amount;
    });
    const topCategories = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 5);

    // Generate insights
    const insights = [];
    if (savingsRate > 30) insights.push({ type: 'good', icon: <CheckCircle size={20} />, title: 'Great Savings!', desc: `You\'re saving ${savingsRate}% of your income. Keep it up!`, color: '#10b981' });
    else if (savingsRate > 10) insights.push({ type: 'ok', icon: <Target size={20} />, title: 'Decent Savings', desc: `You\'re saving ${savingsRate}%. Try to push towards 30%.`, color: '#f59e0b' });
    else if (incomeTotal > 0) insights.push({ type: 'warning', icon: <AlertTriangle size={20} />, title: 'Low Savings Rate', desc: `Only ${savingsRate}% saved. Consider reducing expenses.`, color: '#ef4444' });

    if (transactions.length === 0) insights.push({ type: 'info', icon: <Zap size={20} />, title: 'Get Started!', desc: 'Add your first transaction to unlock AI-powered insights.', color: '#4f46e5' });
    if (avgExpense > 1000) insights.push({ type: 'warning', icon: <AlertTriangle size={20} />, title: 'High Avg Expense', desc: `Average transaction is ₹${avgExpense.toLocaleString('en-IN')}. Consider tracking smaller expenses too.`, color: '#f59e0b' });
    if (topCategories.length > 0) insights.push({ type: 'info', icon: <TrendingDown size={20} />, title: `Top Spending: ${topCategories[0][0]}`, desc: `₹${topCategories[0][1].toLocaleString('en-IN')} spent on ${topCategories[0][0]}. Is this within your budget?`, color: '#7c3aed' });

    return (
        <div className="page-container">
            <h1 className="page-title">Smart Insights</h1>
            <p className="page-subtitle">AI-powered analysis of your spending habits</p>

            {/* Health Score */}
            <div className="dash-card" style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)', border: 'none', color: 'white', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
                <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '140px', height: '140px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }}></div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '0.75rem' }}>Financial Health Score</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '3.5rem', fontWeight: 800 }}>
                            {transactions.length === 0 ? '—' : savingsRate > 30 ? '🟢' : savingsRate > 10 ? '🟡' : '🔴'}
                        </span>
                        <span style={{ fontSize: '2rem', fontWeight: 700 }}>{savingsRate}%</span>
                        <span style={{ fontSize: '0.9rem', opacity: 0.6 }}>savings rate</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Income</div>
                            <div style={{ fontWeight: 700 }}>₹{incomeTotal.toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Expenses</div>
                            <div style={{ fontWeight: 700 }}>₹{expenseTotal.toLocaleString('en-IN')}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>Net Savings</div>
                            <div style={{ fontWeight: 700 }}>₹{(incomeTotal - expenseTotal).toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Insight Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {insights.map((insight, i) => (
                    <div key={i} className="dash-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem', borderLeft: `4px solid ${insight.color}` }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${insight.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: insight.color, flexShrink: 0 }}>
                            {insight.icon}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.95rem' }}>{insight.title}</div>
                            <div style={{ fontSize: '0.82rem', color: '#6b7280', marginTop: '0.25rem' }}>{insight.desc}</div>
                        </div>
                        <ArrowRight size={18} color="#d1d5db" />
                    </div>
                ))}
            </div>

            {/* Top Spending Categories */}
            {topCategories.length > 0 && (
                <div className="dash-card">
                    <h3 className="dash-card-title" style={{ marginBottom: '1rem' }}>Top Spending Categories</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {topCategories.map(([cat, amount], i) => {
                            const pct = expenseTotal > 0 ? (amount / expenseTotal * 100).toFixed(0) : 0;
                            const colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f59e0b', '#10b981'];
                            return (
                                <div key={cat}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                                        <span style={{ fontWeight: 600, color: '#374151', fontSize: '0.88rem' }}>{cat}</span>
                                        <span style={{ fontWeight: 700, color: '#1e1b4b', fontSize: '0.88rem' }}>₹{amount.toLocaleString('en-IN')} ({pct}%)</span>
                                    </div>
                                    <div className="budget-bar-track">
                                        <div className="budget-bar-fill" style={{ width: `${pct}%`, background: colors[i % colors.length] }}></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InsightsPage;
