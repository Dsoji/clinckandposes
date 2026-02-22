import React, { useState } from 'react';

const defaultSettings = {
    brandName: 'CLICK & POSES',
    footerQuote: 'We create our happiness by capturing the most important moments in our lives',
    footerCredit: 'DEVELOPED BY SOJKU',
    aboutVisionTitle: 'OUR VISION',
    aboutNarrativeLead: 'We believe that every moment is a story waiting to be told, and we specialize in transforming these stories into captivating visual narratives.',
    aboutNarrativeBody: "Our team, led by Graphic Smith, is dedicated to capturing the essence of each moment. We don't just take pictures; we create visual experiences that resonate.",
    contactHeader: 'CONTACT US',
    contactBrandText: 'C L I C K S A N D P O S E S',
};

const SettingsPanel = () => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem('cp_settings_data');
        return saved ? JSON.parse(saved) : defaultSettings;
    });

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        localStorage.setItem('cp_settings_data', JSON.stringify(settings));
        alert('Settings saved!');
    };

    const handleReset = () => {
        setSettings(defaultSettings);
        localStorage.removeItem('cp_settings_data');
    };

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Configure site-wide text and branding settings.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={handleReset}>Reset Defaults</button>
                    <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save Settings</button>
                </div>
            </div>

            <div className="admin-grid-2">
                {/* Branding */}
                <div className="admin-card">
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>Branding</h3>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Brand Name</label>
                        <input className="admin-input" type="text" value={settings.brandName} onChange={(e) => handleChange('brandName', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Contact Brand Text</label>
                        <input className="admin-input" type="text" value={settings.contactBrandText} onChange={(e) => handleChange('contactBrandText', e.target.value)} />
                    </div>
                </div>

                {/* Footer */}
                <div className="admin-card">
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>Footer</h3>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Footer Quote</label>
                        <textarea className="admin-textarea" rows="3" value={settings.footerQuote} onChange={(e) => handleChange('footerQuote', e.target.value)} />
                    </div>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Credit Text</label>
                        <input className="admin-input" type="text" value={settings.footerCredit} onChange={(e) => handleChange('footerCredit', e.target.value)} />
                    </div>
                </div>

                {/* About Section */}
                <div className="admin-card" style={{ gridColumn: '1 / -1' }}>
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>About Section</h3>
                    <div className="admin-grid-2">
                        <div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Vision Title</label>
                                <input className="admin-input" type="text" value={settings.aboutVisionTitle} onChange={(e) => handleChange('aboutVisionTitle', e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Lead Narrative</label>
                                <textarea className="admin-textarea" rows="4" value={settings.aboutNarrativeLead} onChange={(e) => handleChange('aboutNarrativeLead', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Contact Header</label>
                                <input className="admin-input" type="text" value={settings.contactHeader} onChange={(e) => handleChange('contactHeader', e.target.value)} />
                            </div>
                            <div className="admin-form-group">
                                <label className="admin-form-label">Body Narrative</label>
                                <textarea className="admin-textarea" rows="4" value={settings.aboutNarrativeBody} onChange={(e) => handleChange('aboutNarrativeBody', e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPanel;
