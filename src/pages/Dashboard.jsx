import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import ExpensesChart from '../components/dashboard/ExpensesChart';
import SummaryCards from '../components/dashboard/SummaryCards';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import TransactionModal from '../components/dashboard/TransactionModal';
import './Dashboard.css';

const DashboardHome = ({ onOpenAddModal }) => {
    return (
        <div className="dashboard-content">
            <header className="dashboard-header">
                <h1>Overview</h1>
                <div className="header-actions">
                    <button className="btn btn-outline" style={{ borderRadius: '50%', width: '40px', height: '40px', padding: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                    </button>
                </div>
            </header>

            <div className="dashboard-grid">
                <div className="dashboard-main-column">
                    <ExpensesChart />
                    <RecentTransactions onOpenAddModal={onOpenAddModal} />
                </div>
                <div className="dashboard-side-column">
                    <SummaryCards />
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
                    {/* Future routes like /dashboard/settings can go here */}
                </Routes>
            </main>

            {isAddModalOpen && (
                <TransactionModal onClose={() => setIsAddModalOpen(false)} />
            )}
        </div>
    );
};

export default Dashboard;
