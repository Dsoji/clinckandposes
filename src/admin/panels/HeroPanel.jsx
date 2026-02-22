import React, { useState } from 'react';

const defaultHeroData = {
    titleRow1: 'CLICK & POSES',
    titleRow2: 'CAPTURING MOMENTS',
    tagline: 'A premium collection of commercial and personal photography.\nCrafting timeless narratives through the lens of precision.',
    chapterTag: '01 // HOME',
    scrollText: 'DISCOVER THE WORK',
};

const HeroPanel = () => {
    const [heroData, setHeroData] = useState(() => {
        const saved = localStorage.getItem('cp_hero_data');
        return saved ? JSON.parse(saved) : defaultHeroData;
    });

    const handleChange = (field, value) => {
        setHeroData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('cp_hero_data', JSON.stringify(heroData));
        alert('Hero content saved successfully!');
    };

    const handleReset = () => {
        setHeroData(defaultHeroData);
        localStorage.removeItem('cp_hero_data');
    };

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Edit the main landing section of your website. Changes will be reflected on the home page.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={handleReset}>Reset</button>
                    <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save Changes</button>
                </div>
            </div>

            <div className="admin-grid-2">
                <div className="admin-card">
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>Main Titles</h3>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Title Row 1</label>
                        <input
                            className="admin-input"
                            type="text"
                            value={heroData.titleRow1}
                            onChange={(e) => handleChange('titleRow1', e.target.value)}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Title Row 2 (Accent)</label>
                        <input
                            className="admin-input"
                            type="text"
                            value={heroData.titleRow2}
                            onChange={(e) => handleChange('titleRow2', e.target.value)}
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Chapter Tag</label>
                        <input
                            className="admin-input"
                            type="text"
                            value={heroData.chapterTag}
                            onChange={(e) => handleChange('chapterTag', e.target.value)}
                        />
                    </div>
                </div>

                <div className="admin-card">
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>Footer Content</h3>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Tagline</label>
                        <textarea
                            className="admin-textarea"
                            value={heroData.tagline}
                            onChange={(e) => handleChange('tagline', e.target.value)}
                            rows="4"
                        />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Scroll Invite Text</label>
                        <input
                            className="admin-input"
                            type="text"
                            value={heroData.scrollText}
                            onChange={(e) => handleChange('scrollText', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroPanel;
