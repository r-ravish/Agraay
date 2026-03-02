import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MONTHS = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: '#fff', border: '1px solid #eef0f6', borderRadius: '10px', padding: '0.5rem 0.8rem', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.8rem', color: '#6b7280' }}>{label}</p>
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#4f46e5' }}>₹{payload[0].value.toLocaleString('en-IN')}</p>
            </div>
        );
    }
    return null;
};

const ExpensesChart = ({ transactions }) => {
    const [data, setData] = useState(MONTHS.map(m => ({ name: m, amount: 0 })));
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (transactions && transactions.length > 0) {
            const monthlyTotals = {};
            MONTHS.forEach(m => { monthlyTotals[m] = 0; });

            transactions.forEach(tx => {
                if (['Expense', 'Atm Withdrawal'].includes(tx.type)) {
                    const monthName = new Date(tx.date).toLocaleString('default', { month: 'short' });
                    if (monthlyTotals[monthName] !== undefined) {
                        monthlyTotals[monthName] += tx.amount;
                    }
                }
            });

            const builtData = MONTHS.map(m => ({ name: m, amount: monthlyTotals[m] }));
            setData(builtData);
            setTotal(builtData.reduce((sum, d) => sum + d.amount, 0));
        } else {
            setData(MONTHS.map(m => ({ name: m, amount: 0 })));
            setTotal(0);
        }
    }, [transactions]);

    return (
        <div className="dash-card" style={{ animationDelay: '0.15s' }}>
            <div className="dash-card-header" style={{ marginBottom: '0.25rem' }}>
                <h2 className="dash-card-title">Monthly Expenses</h2>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.15rem' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#1e1b4b' }}>₹ {total.toLocaleString('en-IN')}</span>
                <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>Last 6 months total</span>
            </div>

            <div style={{ height: '180px', marginTop: '0.75rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                        <defs>
                            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#d1d5db" fontSize={11} tickLine={false} axisLine={false} />
                        <YAxis stroke="#d1d5db" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#expGrad)" dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#6366f1' }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpensesChart;
