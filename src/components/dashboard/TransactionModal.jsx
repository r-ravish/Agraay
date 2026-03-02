import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const transactionTypes = ['Expense', 'Income', 'Transfer', 'Atm Withdrawal', 'Cash Received', 'Cashback', 'Refund'];
const accountTypes = ['Cash', 'Bank Account', 'Credit Card', 'Digital Wallet'];

const TransactionModal = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Expense');
    const [account, setAccount] = useState('Cash');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleKeypad = (value) => {
        if (value === 'del') {
            setAmount(prev => prev.slice(0, -1));
        } else if (value === '.') {
            if (!amount.includes('.')) setAmount(prev => prev + '.');
        } else {
            if (amount.length < 10) setAmount(prev => prev + value);
        }
    };

    const handleSave = async () => {
        if (!amount || parseFloat(amount) <= 0) return setError('Please enter a valid amount');
        if (!description.trim()) return setError('Please enter a description');

        setLoading(true);
        setError('');
        try {
            await api.post('/api/transactions', {
                firebaseUid: currentUser.uid,
                type,
                account,
                description: description.trim(),
                amount: parseFloat(amount),
                date: new Date()
            });
            // Refresh the transaction list
            if (window.__refreshTransactions) {
                await window.__refreshTransactions();
            }
            onClose();
        } catch (err) {
            console.error('Failed to save transaction', err);
            setError('Failed to save. Make sure the backend server is running.');
        }
        setLoading(false);
    };

    const typeColor = ['Income', 'Cash Received', 'Cashback', 'Refund'].includes(type) ? '#10b981' : type === 'Transfer' ? '#6366f1' : '#ef4444';

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">

                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>New Transaction</h3>
                    <button onClick={onClose} style={{ background: '#f3f4f6', border: 'none', borderRadius: '10px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <X size={18} color="#6b7280" />
                    </button>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem', border: '1px solid #fecaca' }}>
                        {error}
                    </div>
                )}

                {/* Transaction Type */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Type</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {transactionTypes.map(t => (
                            <button key={t} onClick={() => setType(t)} style={{ padding: '0.4rem 0.85rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, border: '1.5px solid', cursor: 'pointer', transition: 'all 0.15s', borderColor: type === t ? '#6366f1' : '#e5e7eb', background: type === t ? 'rgba(99,102,241,0.08)' : '#f9fafb', color: type === t ? '#6366f1' : '#6b7280' }}>
                                {t}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Account */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account</label>
                    <select value={account} onChange={(e) => setAccount(e.target.value)}
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f9fafb', fontSize: '0.9rem', color: '#111827', cursor: 'pointer', outline: 'none' }}>
                        {accountTypes.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Description</label>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g. Coffee, Petrol, Salary..."
                        style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f9fafb', fontSize: '0.9rem', color: '#111827', outline: 'none', boxSizing: 'border-box' }}
                    />
                </div>

                {/* Amount Display */}
                <div style={{ background: '#f3f4f6', borderRadius: '14px', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', border: `2px solid ${typeColor}20` }}>
                    <span style={{ color: typeColor, fontWeight: 700, fontSize: '1.5rem' }}>₹</span>
                    <span style={{ fontSize: '2rem', fontWeight: 800, color: '#111827', letterSpacing: '-1px', flexGrow: 1, textAlign: 'center' }}>
                        {amount || '0'}
                    </span>
                    <button onClick={() => handleKeypad('del')} style={{ background: 'rgba(99,102,241,0.1)', border: 'none', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', color: '#6366f1', fontWeight: 700, fontSize: '0.8rem' }}>⌫</button>
                </div>

                {/* Keypad */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'].map(key => (
                        <button key={key} onClick={() => handleKeypad(key)}
                            style={{ padding: '0.9rem', borderRadius: '12px', border: 'none', background: key === 'del' ? 'rgba(239,68,68,0.08)' : '#f3f4f6', color: key === 'del' ? '#ef4444' : '#111827', fontSize: key === 'del' ? '0.85rem' : '1.2rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.1s' }}>
                            {key === 'del' ? '⌫ Del' : key}
                        </button>
                    ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <button onClick={onClose} style={{ padding: '0.9rem', borderRadius: '12px', border: '1.5px solid #e5e7eb', background: '#f9fafb', fontWeight: 700, color: '#6b7280', cursor: 'pointer', fontSize: '0.95rem' }}>Cancel</button>
                    <button onClick={handleSave} disabled={loading} style={{ padding: '0.9rem', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem', opacity: loading ? 0.7 : 1 }}>
                        {loading ? 'Saving...' : 'Save ✓'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TransactionModal;
