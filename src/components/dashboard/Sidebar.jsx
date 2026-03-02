import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, BarChart3, List, Wallet, LogOut, TrendingUp, Settings, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const initial = currentUser?.displayName?.charAt(0)?.toUpperCase() || currentUser?.email?.charAt(0)?.toUpperCase() || 'A';

    return (
        <aside className="dashboard-sidebar">
            <div className="sidebar-header">
                <div>
                    <div className="sidebar-brand">Agraay.</div>
                    <div className="sidebar-brand-sub">Finance Manager</div>
                </div>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', borderRadius: '8px', color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}
                    title="Logout">
                    <LogIn size={18} />
                </button>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Home size={18} /> Home
                </NavLink>
                <NavLink to="/dashboard/charts" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <BarChart3 size={18} /> Charts
                </NavLink>
                <NavLink to="/dashboard/transactions" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <List size={18} /> Transactions
                </NavLink>
                <NavLink to="/dashboard/budget" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Wallet size={18} /> Budget
                </NavLink>
                <NavLink to="/dashboard/insights" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <TrendingUp size={18} /> Insights
                </NavLink>
                <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
                    <Settings size={18} /> Settings
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="user-profile">
                    <div className="avatar">{initial}</div>
                    <div className="user-details">
                        <span className="user-name">{currentUser?.displayName || 'User'}</span>
                        <span className="user-email">{currentUser?.email}</span>
                    </div>
                </div>
                <button className="sidebar-link logout-btn" onClick={handleLogout}>
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
