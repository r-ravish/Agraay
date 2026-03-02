import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import ExpensesChart from '../components/dashboard/ExpensesChart';
import SummaryCards from '../components/dashboard/SummaryCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionModal from '../components/dashboard/TransactionModal';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const DashboardHome = ({ onOpenAddModal }) => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);

    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <div>
                    <h1>Good day, {currentUser?.displayName?.split(' ')[0] || 'there'} 👋</h1>
                    <p className="header-subtitle">Here's your financial summary</p>
                </div>
                <button
                    className="fab-button"
                    onClick={onOpenAddModal}
                    style={{ flexShrink: 0 }}
                >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    Add Transaction
                </button>
            </header>

            <div className="dashboard-grid">
                <div className="dashboard-main-column">
                    <ExpensesChart transactions={transactions} />
                    <RecentTransactions
                        onOpenAddModal={onOpenAddModal}
                        onTransactionsLoaded={setTransactions}
                    />
                </div>
                <div className="dashboard-side-column">
                    <SummaryCards transactions={transactions} />
                </div>
            </div>
        </div>
    );
};

const Dashboard = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    return (
        <div className="dashboard-layout">
            <Sidebar />
            <main className="dashboard-main">
                <Routes>
                    <Route path="/" element={<DashboardHome onOpenAddModal={() => setIsAddModalOpen(true)} />} />
                </Routes>
            </main>

            {isAddModalOpen && (
                <TransactionModal onClose={() => setIsAddModalOpen(false)} />
            )}
        </div>
    );
};

export default Dashboard;
