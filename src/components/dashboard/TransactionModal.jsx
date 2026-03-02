import React, { useState } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const TransactionModal = ({ onClose }) => {
    const { currentUser } = useAuth();
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Expense');
    const [account, setAccount] = useState('Cash');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    // Adapted from screenshots 3 & 4
    const transactionTypes = ['Expense', 'Income', 'Transfer', 'Atm Withdrawal', 'Cash Received', 'Cashback', 'Refund'];
    const accountTypes = ['Cash', 'Bank Account', 'Credit Card'];

    const handleKeypadClick = (value) => {
        if (value === 'del') {
            setAmount(prev => prev.slice(0, -1));
        } else if (value === '.') {
            if (!amount.includes('.')) setAmount(prev => prev + '.');
        } else {
            setAmount(prev => prev + value);
        }
    };

    const handleSave = async () => {
        if (!amount || !description) return alert("Please enter amount and description");

        setLoading(true);
        try {
            await axios.post('http://localhost:5000/api/transactions', {
                firebaseUid: currentUser.uid,
                userId: currentUser.uid, // simplified for now, usually needs mongo ObjectId mapping
                type,
                account,
                description,
                amount: parseFloat(amount)
            });
            onClose();
        } catch (err) {
            console.error("Failed to save transaction", err);
            alert("Failed to save transaction");
        }
        setLoading(false);
    };

    return (
        <div className="modal-overlay" style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div className="modal-content" style={{ background: '#121212', width: '100%', maxWidth: '400px', borderRadius: '30px 30px 0 0', padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '85vh', overflowY: 'auto' }}>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#a0a0a0', cursor: 'pointer' }}>
                        <X size={24} />
                    </button>
                    <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>New Transaction</h3>
                    <div style={{ width: 24 }}></div> {/* spacer */}
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Transaction Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ width: '100%', background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#fff', padding: '1rem', borderRadius: '12px', appearance: 'none', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        {transactionTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#d97706', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Debit A/c</label>
                    <select
                        value={account}
                        onChange={(e) => setAccount(e.target.value)}
                        style={{ width: '100%', background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#fff', padding: '1rem', borderRadius: '12px', appearance: 'none', fontSize: '1rem', cursor: 'pointer' }}
                    >
                        {accountTypes.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 600 }}>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Coffee, groceries, etc."
                        style={{ width: '100%', background: '#1e1e1e', border: '1px solid #2a2a2a', color: '#fff', padding: '1rem', borderRadius: '12px', fontSize: '1rem' }}
                    />
                </div>

                <div className="amount-display" style={{ background: '#1e1e1e', borderRadius: '15px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                    <div style={{ background: '#2e1065', color: '#d946ef', padding: '0.5rem 1rem', borderRadius: '10px', fontWeight: 600 }}>₹ <ChevronDown size={14} style={{ display: 'inline', marginLeft: 4 }} /></div>
                    <div style={{ flexGrow: 1, borderLeft: '2px solid #334155', paddingLeft: '1rem', color: '#fff', fontSize: '1.5rem', minHeight: '36px', display: 'flex', alignItems: 'center' }}>
                        {amount || '0'}
                    </div>
                    <button onClick={() => handleKeypadClick('del')} style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                        <X size={20} />
                    </button>
                </div>

                {/* Custom Keypad adapted from screenshot 3 */}
                <div className="keypad" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', padding: '1.5rem 0', marginTop: '1rem' }}>
                    {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'].map(key => (
                        <button key={key} onClick={() => handleKeypadClick(key)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '1.5rem', fontWeight: 600, padding: '0.5rem', cursor: 'pointer' }}>
                            {key}
                        </button>
                    ))}
                    <button style={{ background: 'transparent', border: 'none', color: '#d946ef', fontSize: '1.5rem', fontWeight: 600, padding: '0.5rem', cursor: 'pointer' }}>+</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem', paddingBottom: '1rem' }}>
                    <button onClick={onClose} style={{ background: '#e2e8f0', color: '#1e293b', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
                        Cancel
                    </button>
                    <button onClick={handleSave} disabled={loading} style={{ background: '#6d28d9', color: '#fff', padding: '1rem', borderRadius: '12px', fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        {loading ? 'Saving...' : 'Done'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TransactionModal;
