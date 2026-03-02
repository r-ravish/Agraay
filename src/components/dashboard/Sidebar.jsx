import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Home, PieChart, List, CreditCard, LogOut, Settings } from 'lucide-react';
import Logo from '../common/Logo';

const Sidebar = () => {
    const { logout, currentUser } = useAuth();

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
                <Logo width={80} />
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Home size={20} />
                    <span>Home</span>
                </NavLink>
                <NavLink to="/dashboard/charts" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <PieChart size={20} />
                    <span>Charts</span>
                </NavLink>
                <NavLink to="/dashboard/transactions" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <List size={20} />
                    <span>List</span>
                </NavLink>
                <NavLink to="/dashboard/budget" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <CreditCard size={20} />
                    <span>Budget</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">{currentUser?.displayName?.charAt(0) || 'U'}</div>
                    <div className="user-details">
                        <span className="user-name">{currentUser?.displayName || 'User'}</span>
                        <span className="user-email">{currentUser?.email}</span>
                    </div>
                </div>
                <button className="sidebar-link logout-btn" onClick={() => logout()}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
