import React, { useState, useEffect } from 'react';
import { fetchSectionData, saveSectionData } from '../../services/portfolioService';

const defaultHeroData = {
    titleRow1: 'CLICK & POSES',
    titleRow2: 'CAPTURING MOMENTS',
    tagline: 'A premium collection of commercial and personal photography.\nCrafting timeless narratives through the lens of precision.',
    chapterTag: '01 // HOME',
    scrollText: 'DISCOVER THE WORK',
};
const HeroPanel = () => {
    const [heroData, setHeroData] = useState(defaultHeroData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadMetadata = async () => {
            try {
                const data = await fetchSectionData('hero');
                if (data) setHeroData(data);
            } catch (err) {
                console.error("Failed to load hero metadata:", err);
            } finally {
                setLoading(false);
            }
        };
        loadMetadata();
    }, []);

    const handleChange = (field, value) => {
        setHeroData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSectionData('hero', heroData);
            alert('Hero content saved to Firebase successfully!');
        } catch (err) {
            console.error("Failed to save hero metadata:", err);
            alert('Failed to save. Check permissions.');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setHeroData(defaultHeroData);
    };

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Edit the main landing section of your website. Changes will be reflected on the home page.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {loading && <span style={{ color: 'var(--gold)' }}>Loading...</span>}
                    <button className="admin-btn admin-btn-ghost" onClick={handleReset}>Reset</button>
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || loading}>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
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
