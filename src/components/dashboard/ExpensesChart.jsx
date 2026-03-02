import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const ExpensesChart = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const { currentUser } = useAuth();

    useEffect(() => {
        // Generate placeholder data for now until we connect the full backend flow
        const placeholderData = [
            { name: 'Oct', amount: 300 },
            { name: 'Nov', amount: 500 },
            { name: 'Dec', amount: 450 },
            { name: 'Jan', amount: 600 },
            { name: 'Feb', amount: 400 },
            { name: 'Mar', amount: 800 },
        ];
        setData(placeholderData);
        setTotal(placeholderData.reduce((sum, item) => sum + item.amount, 0));
    }, []);

    return (
        <div className="dash-card expenses-chart-card">
            <div className="dash-card-header">
                <h2 className="dash-card-title">Expenses</h2>
                <button className="icon-btn"><ArrowRight size={20} color="#a0a0a0" /></button>
            </div>

            <div className="expense-total">
                <span className="currency">₹</span> {total.toLocaleString()}
                <div className="expense-month">March 2026</div>
            </div>

            <div className="chart-container" style={{ height: '250px', marginTop: '1.5rem', background: 'linear-gradient(180deg, #7c3aed 0%, #5b21b6 100%)', borderRadius: '15px', padding: '1rem 0' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#cbd5e1" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="amount" stroke="#ffffff" strokeWidth={2} fillOpacity={1} fill="url(#colorAmount)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ExpensesChart;
