import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const ExpensesChart = ({ transactions }) => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Build data from real transactions or show sample
        const months = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
        const now = new Date();

        if (transactions && transactions.length > 0) {
            const monthlyData = {};
            months.forEach(m => { monthlyData[m] = 0; });

            transactions.forEach(tx => {
                if (tx.type === 'Expense' || tx.type === 'Atm Withdrawal') {
                    const monthName = new Date(tx.date).toLocaleString('default', { month: 'short' });
                    if (monthlyData[monthName] !== undefined) {
                        monthlyData[monthName] += tx.amount;
                    }
                }
            });

            const builtData = months.map(m => ({ name: m, amount: monthlyData[m] || 0 }));
            setData(builtData);
            setTotal(builtData.reduce((sum, d) => sum + d.amount, 0));
        } else {
            // Sample data
            const sample = [300, 500, 450, 600, 400, 800];
            const builtData = months.map((m, i) => ({ name: m, amount: sample[i] }));
            setData(builtData);
            setTotal(builtData.reduce((sum, d) => sum + d.amount, 0));
        }
    }, [transactions]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '10px', padding: '0.5rem 0.85rem', color: 'white' }}>
                    <p style={{ margin: 0, fontWeight: 600 }}>{label}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>₹ {payload[0].value.toLocaleString()}</p>
                </div>
            );
        }
        return null;
    };

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
            <div className="expense-month">Last 6 months total</div>

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
