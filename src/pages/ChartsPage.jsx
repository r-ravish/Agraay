import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const COLORS = ['#4f46e5', '#7c3aed', '#a855f7', '#ec4899', '#f43f5e', '#f59e0b', '#10b981', '#06b6d4'];

const ChartsPage = () => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [period, setPeriod] = useState('month');

    useEffect(() => {
        if (currentUser) {
            api.get(`/api/transactions?firebaseUid=${currentUser.uid}`)
                .then(res => setTransactions(res.data))
                .catch(() => { });
        }
    }, [currentUser]);

    // Category breakdown
    const categoryMap = {};
    const incomeTotal = transactions.filter(t => ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(t.type)).reduce((s, t) => s + t.amount, 0);
    const expenseTotal = transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type)).reduce((s, t) => s + t.amount, 0);

    transactions.forEach(t => {
        if (['Expense', 'Atm Withdrawal'].includes(t.type)) {
            const cat = t.account || 'Other';
            categoryMap[cat] = (categoryMap[cat] || 0) + t.amount;
        }
    });

    const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
    if (pieData.length === 0) {
        pieData.push({ name: 'No Data', value: 1 });
    }

    // Monthly trend
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyIncome = {};
    const monthlyExpense = {};
    months.forEach(m => { monthlyIncome[m] = 0; monthlyExpense[m] = 0; });

    transactions.forEach(t => {
        const m = new Date(t.date).toLocaleString('default', { month: 'short' });
        if (months.includes(m)) {
            if (['Income', 'Cash Received', 'Cashback', 'Refund'].includes(t.type)) {
                monthlyIncome[m] += t.amount;
            } else {
                monthlyExpense[m] += t.amount;
            }
        }
    });

    const trendData = months.map(m => ({
        name: m,
        income: monthlyIncome[m],
        expense: monthlyExpense[m],
    }));

    // Daily spend (last 7 days)
    const dailySpend = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short' });
        const dayStr = d.toDateString();
        const total = transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type) && new Date(t.date).toDateString() === dayStr).reduce((s, t) => s + t.amount, 0);
        dailySpend.push({ name: dayLabel, amount: total });
    }

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0.6rem 0.9rem', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}>
                    <p style={{ margin: 0, fontWeight: 700, color: '#1e1b4b', fontSize: '0.85rem' }}>{label}</p>
                    {payload.map((p, i) => (
                        <p key={i} style={{ margin: '2px 0 0', fontSize: '0.82rem', color: p.color }}>
                            {p.name}: ₹{p.value.toLocaleString('en-IN')}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Analytics & Charts</h1>
            <p className="page-subtitle">Visualize your financial patterns</p>

            {/* Summary Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <TrendingUp size={28} />
                        <div>
                            <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Total Income</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{incomeTotal.toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                </div>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <TrendingDown size={28} />
                        <div>
                            <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Total Expenses</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>₹{expenseTotal.toLocaleString('en-IN')}</div>
                        </div>
                    </div>
                </div>
                <div className="dash-card" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: 'white' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Calendar size={28} />
                        <div>
                            <div style={{ fontSize: '0.78rem', opacity: 0.8 }}>Transactions</div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{transactions.length}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>

                {/* Pie Chart */}
                <div className="dash-card" style={{ animationDelay: '0.1s' }}>
                    <h3 className="dash-card-title" style={{ marginBottom: '1rem' }}>Spending by Account</h3>
                    <div style={{ height: '280px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(v) => `₹${v.toLocaleString('en-IN')}`} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Daily Bar Chart */}
                <div className="dash-card" style={{ animationDelay: '0.2s' }}>
                    <h3 className="dash-card-title" style={{ marginBottom: '1rem' }}>Last 7 Days Spend</h3>
                    <div style={{ height: '280px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={dailySpend}>
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar dataKey="amount" fill="#7c3aed" radius={[8, 8, 0, 0]} name="Spent" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Income vs Expense Trend */}
            <div className="dash-card" style={{ animationDelay: '0.3s' }}>
                <h3 className="dash-card-title" style={{ marginBottom: '1rem' }}>Income vs Expenses (Monthly)</h3>
                <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData}>
                            <defs>
                                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="expGradChart" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fill="url(#incGrad)" name="Income" />
                            <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2.5} fill="url(#expGradChart)" name="Expense" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default ChartsPage;
