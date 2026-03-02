import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import ExpensesChart from '../components/dashboard/ExpensesChart';
import SummaryCards from '../components/dashboard/SummaryCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionModal from '../components/dashboard/TransactionModal';
import ChartsPage from './ChartsPage';
import TransactionsPage from './TransactionsPage';
import BudgetPage from './BudgetPage';
import InsightsPage from './InsightsPage';
import SettingsPage from './SettingsPage';
import { useAuth } from '../contexts/AuthContext';
import { Minus, Target, Plus, DollarSign } from 'lucide-react';
import './Dashboard.css';

const DashboardHome = ({ onOpenAddModal }) => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <div>
                    <h1>{greeting}, {currentUser?.displayName?.split(' ')[0] || 'there'}.</h1>
                    <p className="header-subtitle">Here's your financial overview for today</p>
                </div>
            </header>

            {/* Quick Actions - horizontal row of 4 */}
            <div className="quick-action-grid" style={{ marginBottom: '1rem' }}>
                <div className="quick-action-card" onClick={onOpenAddModal} style={{ animationDelay: '0.05s' }}>
                    <div className="quick-action-icon" style={{ background: '#eef2ff' }}>
                        <Minus size={18} color="#4f46e5" />
                    </div>
                    <div className="quick-action-text">
                        <div className="quick-action-label">New Expense</div>
                        <div className="quick-action-desc">Record a payment</div>
                    </div>
                </div>
                <div className="quick-action-card" onClick={() => navigate('/dashboard/budget')} style={{ animationDelay: '0.1s' }}>
                    <div className="quick-action-icon" style={{ background: '#fef3c7' }}>
                        <Target size={18} color="#f59e0b" />
                    </div>
                    <div className="quick-action-text">
                        <div className="quick-action-label">Set Budget</div>
                        <div className="quick-action-desc">Savings goal</div>
                    </div>
                </div>
                <div className="quick-action-card" onClick={onOpenAddModal} style={{ animationDelay: '0.15s' }}>
                    <div className="quick-action-icon" style={{ background: '#ecfdf5' }}>
                        <Plus size={18} color="#10b981" />
                    </div>
                    <div className="quick-action-text">
                        <div className="quick-action-label">Add Transaction</div>
                        <div className="quick-action-desc">Add Income</div>
                    </div>
                </div>
                <div className="quick-action-card" onClick={onOpenAddModal} style={{ animationDelay: '0.2s' }}>
                    <div className="quick-action-icon" style={{ background: '#fce7f3' }}>
                        <DollarSign size={18} color="#ec4899" />
                    </div>
                    <div className="quick-action-text">
                        <div className="quick-action-label">Log earnings</div>
                        <div className="quick-action-desc">Income entry</div>
                    </div>
                </div>
            </div>

            {/* 2x2 Grid: Chart + Insights | Transactions + Bills */}
            <div className="dashboard-grid">
                <ExpensesChart transactions={transactions} />
                <SummaryCards transactions={transactions} />
                <RecentTransactions
                    onOpenAddModal={onOpenAddModal}
                    onTransactionsLoaded={setTransactions}
                />
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
                    <Route path="/charts" element={<ChartsPage />} />
                    <Route path="/transactions" element={<TransactionsPage />} />
                    <Route path="/budget" element={<BudgetPage />} />
                    <Route path="/insights" element={<InsightsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </main>

            {isAddModalOpen && (
                <TransactionModal onClose={() => setIsAddModalOpen(false)} />
            )}
        </div>
    );
};

export default Dashboard;
