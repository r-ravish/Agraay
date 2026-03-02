import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, Plus } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const RecentTransactions = ({ onOpenAddModal }) => {
    const [transactions, setTransactions] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchTransactions = async () => {
            if (currentUser) {
                try {
                    const res = await axios.get(`http://localhost:5000/api/transactions?firebaseUid=${currentUser.uid}`);
                    setTransactions(res.data);
                } catch (err) {
                    console.error("Failed to fetch transactions", err);
                }
            }
        };

        fetchTransactions();
    }, [currentUser]);

    return (
        <div className="dash-card" style={{ position: 'relative', minHeight: '300px' }}>
            <div className="dash-card-header">
                <h2 className="dash-card-title">Latest Transactions</h2>
                <button className="icon-btn" style={{ background: 'transparent', border: 'none' }}>
                    <ArrowRight size={20} color="#a0a0a0" />
                </button>
            </div>

            {transactions.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0' }}>
                    <FileText size={40} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.9rem' }}>No transaction available</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                    {transactions.map(tx => (
                        <div key={tx._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d946ef' }}>
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, color: '#f1f5f9' }}>{tx.description} <span style={{ fontSize: '0.7rem', background: '#334155', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>{tx.type.toUpperCase()}</span></div>
                                    <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>{new Date(tx.date).toLocaleDateString()}</div>
                                </div>
                            </div>
                            <div style={{ fontWeight: 700, color: tx.type === 'Income' ? '#4ade80' : '#f87171' }}>
                                {tx.type === 'Income' ? '+' : '-'} ₹ {tx.amount}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Action Button */}
            <button
                onClick={onOpenAddModal}
                className="fab-button with-text"
                style={{ position: 'absolute', bottom: '2rem', right: '2rem', zIndex: 10 }}
            >
                <Plus size={24} /> Add
            </button>
        </div>
    );
};

export default RecentTransactions;
