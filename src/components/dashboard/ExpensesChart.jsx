import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '10px', padding: '0.5rem 0.85rem', color: 'white' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.85rem' }}>{label}</p>
                <p style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>₹ {payload[0].value.toLocaleString('en-IN')}</p>
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
        <div className="dash-card expenses-chart-card">
            <div className="dash-card-header" style={{ marginBottom: '0.5rem' }}>
                <h2 className="dash-card-title">Monthly Expenses</h2>
                <button className="icon-btn" style={{ background: 'rgba(255,255,255,0.15)' }}>
                    <ArrowRight size={18} color="white" />
                </button>
            </div>

            <div className="expense-total">
                <span className="currency">₹</span> {total.toLocaleString('en-IN')}
            </div>
            <div className="expense-month">{total === 0 ? 'No expenses recorded yet' : 'Last 6 months total'}</div>

            <div style={{ height: '200px', marginTop: '1.5rem' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                        <defs>
                            <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} tickLine={false} axisLine={false} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="amount" stroke="#ffffff" strokeWidth={2.5} fillOpacity={1} fill="url(#expGrad)" dot={false} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpensesChart;
