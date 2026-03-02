import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ArrowRight, Clock } from 'lucide-react';

const COLORS = ['#4f46e5', '#ef4444', '#10b981'];

const SummaryCards = ({ transactions }) => {
    const cashIn = transactions ? transactions.filter(t => ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(t.type)).reduce((s, t) => s + t.amount, 0) : 0;
    const totalExpenses = transactions ? transactions.filter(t => ['Expense', 'Atm Withdrawal'].includes(t.type)).reduce((s, t) => s + t.amount, 0) : 0;
    const balance = cashIn - totalExpenses;

    const pieData = [
        { name: 'Net Balance', value: Math.abs(balance) || 1 },
        { name: 'Expenses', value: totalExpenses || 1 },
        { name: 'Income', value: cashIn || 1 },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Insights Card with Donut */}
            <div className="dash-card" style={{ animationDelay: '0.2s' }}>
                <div className="dash-card-header" style={{ marginBottom: '0.5rem' }}>
                    <h2 className="dash-card-title">Insights</h2>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '0.75rem' }}>AI analysis</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>

                    {/* Left: Cash In Hand */}
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Cash In Hand</div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e1b4b' }}>₹{cashIn.toLocaleString('en-IN')}</div>
                    </div>

                    {/* Right: Donut Chart */}
                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                        <PieChart width={120} height={120}>
                            <Pie data={pieData} cx={55} cy={55} innerRadius={35} outerRadius={52} paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
                                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                            </Pie>
                        </PieChart>
                    </div>
                </div>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginTop: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5', display: 'inline-block' }}></span>
                        <span style={{ color: '#6b7280' }}>Net Balance:</span>
                        <span style={{ fontWeight: 700, color: '#1e1b4b' }}>₹ {Math.abs(balance).toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>
                        <span style={{ color: '#6b7280' }}>Expenses:</span>
                        <span style={{ fontWeight: 700, color: '#1e1b4b' }}>₹ {totalExpenses.toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
                        <span style={{ color: '#6b7280' }}>Income:</span>
                        <span style={{ fontWeight: 700, color: '#1e1b4b' }}>₹ {cashIn.toLocaleString('en-IN')}</span>
                    </div>
                </div>

                {balance < 0 && (
                    <div style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, marginTop: '0.5rem' }}>• Expenses exceed income</div>
                )}
            </div>

            {/* Bills Due */}
            <div className="dash-card" style={{ animationDelay: '0.35s' }}>
                <div className="dash-card-header">
                    <h2 className="dash-card-title">Bills Due</h2>
                    <button className="icon-btn"><ArrowRight size={16} color="#6b7280" /></button>
                </div>
                <div style={{ textAlign: 'center', padding: '1rem 0', color: '#9ca3af' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(99,102,241,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem' }}>
                        <Clock size={22} color="#6366f1" />
                    </div>
                    <p style={{ margin: '0 0 0.75rem', fontSize: '0.82rem' }}>No bills added yet</p>
                    <button style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '0.55rem 1rem', borderRadius: '8px', width: '100%', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', fontFamily: 'inherit' }}>
                        + Add Bill
                    </button>
                </div>
            </div>

        </div>
    );
};

export default SummaryCards;
