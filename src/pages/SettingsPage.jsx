import React from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SettingsPage = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const sections = [
        {
            title: 'Account',
            items: [
                { icon: <User size={20} />, label: 'Profile', desc: currentUser?.displayName || 'User', color: '#4f46e5' },
                { icon: <Bell size={20} />, label: 'Notifications', desc: 'Push & Email alerts', color: '#f59e0b' },
                { icon: <Shield size={20} />, label: 'Security', desc: 'Password & 2FA', color: '#10b981' },
            ]
        },
        {
            title: 'Preferences',
            items: [
                { icon: <Palette size={20} />, label: 'Appearance', desc: 'Theme & colors', color: '#7c3aed' },
                { icon: <Globe size={20} />, label: 'Currency', desc: '₹ INR (Indian Rupee)', color: '#06b6d4' },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: <HelpCircle size={20} />, label: 'Help Center', desc: 'FAQs & guides', color: '#ec4899' },
            ]
        }
    ];

    return (
        <div className="page-container">
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your account and preferences</p>

            {/* User Card */}
            <div className="dash-card" style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', border: 'none', color: 'white', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, color: '#78350f', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' }}>
                    {currentUser?.displayName?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{currentUser?.displayName || 'Agraay User'}</div>
                    <div style={{ opacity: 0.7, fontSize: '0.88rem' }}>{currentUser?.email}</div>
                    <div style={{ marginTop: '0.25rem', fontSize: '0.75rem', opacity: 0.5 }}>Free Plan · Active since {new Date(currentUser?.metadata?.creationTime).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</div>
                </div>
            </div>

            {/* Settings Sections */}
            {sections.map(section => (
                <div key={section.title} style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>{section.title}</h3>
                    <div className="dash-card" style={{ padding: 0, overflow: 'hidden' }}>
                        {section.items.map((item, i) => (
                            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', cursor: 'pointer', transition: 'all 0.15s', borderBottom: i < section.items.length - 1 ? '1px solid #f3f4f6' : 'none' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: `${item.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, color: '#111827', fontSize: '0.92rem' }}>{item.label}</div>
                                    <div style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{item.desc}</div>
                                </div>
                                <svg width="16" height="16" fill="none" stroke="#d1d5db" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" /></svg>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Logout */}
            <button onClick={handleLogout}
                style={{ width: '100%', padding: '1rem', borderRadius: '14px', border: '1.5px solid #fecaca', background: '#fef2f2', color: '#ef4444', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontFamily: 'inherit', transition: 'all 0.2s' }}>
                <LogOut size={18} /> Sign Out
            </button>
        </div>
    );
};

export default SettingsPage;
