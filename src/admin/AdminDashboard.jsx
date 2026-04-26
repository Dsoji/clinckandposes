import React, { useState } from 'react';
import { supabase } from '../supabase';
import './AdminDashboard.css';
import DashboardPanel from './panels/DashboardPanel';
import HeroPanel from './panels/HeroPanel';
import PortfolioPanel from './panels/PortfolioPanel';
import ReviewsPanel from './panels/ReviewsPanel';
import SettingsPanel from './panels/SettingsPanel';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '◎' },
    { id: 'hero', label: 'Hero', icon: '★' },
    { id: 'portfolio', label: 'Portfolio', icon: '◧' },
    { id: 'reviews', label: 'Reviews', icon: '✦' },
    { id: 'settings', label: 'Settings', icon: '⚙' },
];

const AdminDashboard = ({ user }) => {
    const [activePanel, setActivePanel] = useState('dashboard');

    const renderPanel = () => {
        switch (activePanel) {
            case 'dashboard': return <DashboardPanel onNavigate={setActivePanel} />;
            case 'hero': return <HeroPanel />;
            case 'portfolio': return <PortfolioPanel />;
            case 'reviews': return <ReviewsPanel />;
            case 'settings': return <SettingsPanel />;
            default: return <DashboardPanel onNavigate={setActivePanel} />;
        }
    };

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <a href="/" className="admin-logo-link">
                        <span className="admin-logo-text">C&P</span>
                    </a>
                    <span className="admin-label">ADMIN PANEL</span>
                </div>

                <nav className="admin-nav">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            className={`admin-nav-item ${activePanel === item.id ? 'active' : ''}`}
                            onClick={() => setActivePanel(item.id)}
                        >
                            <span className="nav-icon">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <a href="/" className="back-to-site-link">
                        ← Back to Site
                    </a>
                    <button
                        className="admin-signout-sidebar-btn"
                        onClick={() => supabase.auth.signOut()}
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            <main className="admin-main">
                <header className="admin-topbar">
                    <h1 className="admin-page-title">
                        {navItems.find(n => n.id === activePanel)?.label || 'Dashboard'}
                    </h1>
                    <div className="admin-topbar-right">
                        <span className="admin-user">{user?.email || 'Admin'}</span>
                        <button
                            className="admin-signout-btn"
                            onClick={() => supabase.auth.signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    {renderPanel()}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
