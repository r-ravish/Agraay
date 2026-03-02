import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { Plus, TrendingUp, BarChart3, Wallet, Target, Zap, ArrowRight } from 'lucide-react';
import './Dashboard.css';

const DashboardHome = ({ onOpenAddModal }) => {
    const { currentUser } = useAuth();
    const [transactions, setTransactions] = useState([]);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <div>
                    <h1>{greeting}, {currentUser?.displayName?.split(' ')[0] || 'there'} 👋</h1>
                    <p className="header-subtitle">Here's your financial overview for today</p>
                </div>
                <button className="fab-button" onClick={onOpenAddModal}>
                    <Plus size={18} /> Add Transaction
                </button>
            </header>

            {/* Quick Actions */}
            <div className="quick-action-grid" style={{ marginBottom: '1.5rem' }}>
                <div className="quick-action-card" onClick={onOpenAddModal} style={{ animationDelay: '0.1s' }}>
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #ede9fe, #ddd6fe)' }}>
                        <Plus size={22} color="#7c3aed" />
                    </div>
                    <div className="quick-action-label">New Expense</div>
                    <div className="quick-action-desc">Record a payment</div>
                </div>
                <div className="quick-action-card" onClick={onOpenAddModal} style={{ animationDelay: '0.15s' }}>
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)' }}>
                        <TrendingUp size={22} color="#10b981" />
                    </div>
                    <div className="quick-action-label">Add Income</div>
                    <div className="quick-action-desc">Log earnings</div>
                </div>
                <div className="quick-action-card" style={{ animationDelay: '0.2s' }}>
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
                        <Target size={22} color="#f59e0b" />
                    </div>
                    <div className="quick-action-label">Set Budget</div>
                    <div className="quick-action-desc">Savings goal</div>
                </div>
                <div className="quick-action-card" style={{ animationDelay: '0.25s' }}>
                    <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, #fce7f3, #fbcfe8)' }}>
                        <Zap size={22} color="#ec4899" />
                    </div>
                    <div className="quick-action-label">Insights</div>
                    <div className="quick-action-desc">AI analysis</div>
                </div>
            </div>

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
