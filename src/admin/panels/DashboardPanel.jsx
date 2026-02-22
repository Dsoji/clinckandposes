import React from 'react';

const DashboardPanel = ({ onNavigate }) => {
    return (
        <div>
            {/* Stats Row */}
            <div className="admin-grid-3" style={{ marginBottom: '2rem' }}>
                <div className="admin-card stat-card">
                    <div className="stat-number">4</div>
                    <div className="stat-label">Portfolio Sections</div>
                </div>
                <div className="admin-card stat-card">
                    <div className="stat-number">5</div>
                    <div className="stat-label">Client Reviews</div>
                </div>
                <div className="admin-card stat-card">
                    <div className="stat-number">11</div>
                    <div className="stat-label">Gallery Images</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="panel-header">
                <h3 className="admin-card-title">Quick Actions</h3>
            </div>
            <div className="admin-grid-3">
                <div className="admin-card quick-action-card" onClick={() => onNavigate('hero')}>
                    <span className="quick-action-icon">★</span>
                    <span className="quick-action-label">Edit Hero</span>
                </div>
                <div className="admin-card quick-action-card" onClick={() => onNavigate('portfolio')}>
                    <span className="quick-action-icon">◧</span>
                    <span className="quick-action-label">Manage Portfolio</span>
                </div>
                <div className="admin-card quick-action-card" onClick={() => onNavigate('reviews')}>
                    <span className="quick-action-icon">✦</span>
                    <span className="quick-action-label">View Reviews</span>
                </div>
                <div className="admin-card quick-action-card" onClick={() => onNavigate('settings')}>
                    <span className="quick-action-icon">⚙</span>
                    <span className="quick-action-label">Site Settings</span>
                </div>
                <div className="admin-card quick-action-card" onClick={() => window.open('/', '_blank')}>
                    <span className="quick-action-icon">↗</span>
                    <span className="quick-action-label">View Live Site</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardPanel;
