import React, { useState, useEffect, useRef } from 'react';
import { fetchSectionData, saveSectionData } from '../../services/portfolioService';
import { migrateFirebaseToSupabase } from '../../services/firebaseMigration';

const defaultSettings = {
    brandName: 'CLICK & POSES',
    brandFontFamily: "'EB Garamond', serif",
    brandFontSize: '1.8rem',
    footerQuote: 'We create our happiness by capturing the most important moments in our lives',
    footerCredit: 'DEVELOPED BY SOJKU',
    aboutVisionTitle: 'OUR VISION',
    aboutNarrativeLead: 'We believe that every moment is a story waiting to be told, and we specialize in transforming these stories into captivating visual narratives.',
    aboutNarrativeBody: "Our team, led by Graphic Smith, is dedicated to capturing the essence of each moment. We don't just take pictures; we create visual experiences that resonate.",
    contactHeader: 'CONTACT US',
    contactBrandText: 'C L I C K S A N D P O S E S',
};

const fontOptions = [
    { value: "'EB Garamond', serif", label: 'EB Garamond (default)' },
    { value: "'Playfair Display', serif", label: 'Playfair Display' },
    { value: "'Cormorant Garamond', serif", label: 'Cormorant Garamond' },
    { value: "'Bodoni Moda', serif", label: 'Bodoni Moda' },
    { value: "'Cinzel', serif", label: 'Cinzel' },
    { value: "'Italiana', serif", label: 'Italiana' },
    { value: "'Inter', sans-serif", label: 'Inter (sans)' },
];

const SettingsPanel = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [migrating, setMigrating] = useState(false);
    const [migrationLog, setMigrationLog] = useState([]);
    const logBoxRef = useRef(null);

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await fetchSectionData('settings');
                if (data) setSettings(data);
            } catch (err) {
                console.error("Failed to load settings:", err);
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const handleChange = (field, value) => {
        setSettings(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await saveSectionData('settings', settings);
            alert('Settings saved!');
        } catch (err) {
            console.error("Failed to save settings:", err);
            alert('Failed to save. Check permissions.');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all site settings to their defaults?')) {
            setSettings(defaultSettings);
        }
    };

    const appendLog = (line) => {
        setMigrationLog(prev => {
            const next = [...prev, line];
            queueMicrotask(() => {
                if (logBoxRef.current) logBoxRef.current.scrollTop = logBoxRef.current.scrollHeight;
            });
            return next;
        });
    };

    const handleMigrate = async () => {
        const ok = confirm(
            'Migrate all Firebase data into Supabase?\n\n' +
            'This reads your Firestore docs (hero, portfolio, reviews, settings), re-uploads any Firebase Storage images to your Supabase bucket, and writes the result into the site_content table.\n\n' +
            'Safe to re-run; it overwrites Supabase rows with the latest Firebase content.'
        );
        if (!ok) return;
        setMigrating(true);
        setMigrationLog([`Starting migration at ${new Date().toLocaleTimeString()}`]);
        try {
            const summary = await migrateFirebaseToSupabase(appendLog);
            const note = summary.errors.length
                ? `Completed with ${summary.errors.length} error(s). Check the log.`
                : `Migration complete. ${summary.migrated.length} section(s) migrated.`;
            alert(note);
        } catch (err) {
            console.error(err);
            appendLog(`FATAL: ${err.message || err}`);
            alert('Migration failed. See the log for details.');
        } finally {
            setMigrating(false);
        }
    };

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Configure site-wide text and branding settings.
                </p>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {loading && <span style={{ color: 'var(--gold)' }}>Loading...</span>}
                    <button className="admin-btn admin-btn-ghost" onClick={handleReset}>Reset Defaults</button>
                    <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving || loading}>
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </div>

            <div className="admin-grid-2">
                {/* Branding */}
                <div className="admin-card">
                    <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>Navigation Bar Title</h3>
                    <div className="admin-form-group">
                        <label className="admin-form-label">Brand Text</label>
                        <input
                            className="admin-input"
                            type="text"
                            value={settings.brandName}
                            onChange={(e) => handleChange('brandName', e.target.value)}
                            placeholder="CLICK & POSES"
                        />
                    </div>
                    <div className="admin-grid-2">
                        <div className="admin-form-group">
                            <label className="admin-form-label">Font Family</label>
                            <select
                                className="admin-input"
                                value={settings.brandFontFamily || defaultSettings.brandFontFamily}
                                onChange={(e) => handleChange('brandFontFamily', e.target.value)}
                                style={{ fontFamily: settings.brandFontFamily || defaultSettings.brandFontFamily }}
                            >
                                {fontOptions.map(opt => (
                                    <option key={opt.value} value={opt.value} style={{ fontFamily: opt.value }}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="admin-form-group">
                            <label className="admin-form-label">Font Size (e.g. 1.8rem, 28px)</label>
                            <input
                                className="admin-input"
                                type="text"
                                value={settings.brandFontSize || defaultSettings.brandFontSize}
                                onChange={(e) => handleChange('brandFontSize', e.target.value)}
                                placeholder="1.8rem"
                            />
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: '0.5rem',
                            padding: '1.25rem 1.5rem',
                            background: '#050505',
                            border: '1px solid rgba(255,255,255,0.06)',
                            borderRadius: '8px',
                        }}
                    >
                        <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase' }}>Live Preview</span>
                        <div
                            style={{
                                marginTop: '0.5rem',
                                color: '#fff',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontWeight: 500,
                                fontFamily: settings.brandFontFamily || defaultSettings.brandFontFamily,
                                fontSize: settings.brandFontSize || defaultSettings.brandFontSize,
                            }}
                        >
                            {settings.brandName || 'CLICK & POSES'}
                        </div>
                    </div>
                    <div className="admin-form-group" style={{ marginTop: '1.5rem' }}>
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

                {/* Firebase → Supabase Migration */}
                <div className="admin-card" style={{ gridColumn: '1 / -1', borderColor: 'rgba(212,175,55,0.3)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                            <h3 className="admin-card-title">Firebase → Supabase Migration</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0.4rem 0 0', fontSize: '0.8rem', maxWidth: '60ch' }}>
                                One-time tool. Reads every site/* document from your existing Firebase project, copies any Firebase Storage images into your Supabase bucket, and writes the result into Supabase. Safe to re-run.
                            </p>
                        </div>
                        <button
                            className="admin-btn admin-btn-primary"
                            onClick={handleMigrate}
                            disabled={migrating}
                            style={{ whiteSpace: 'nowrap' }}
                        >
                            {migrating ? 'Migrating…' : 'Run Migration'}
                        </button>
                    </div>
                    {migrationLog.length > 0 && (
                        <div
                            ref={logBoxRef}
                            style={{
                                marginTop: '1rem',
                                padding: '1rem',
                                background: '#050505',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '8px',
                                maxHeight: '320px',
                                overflowY: 'auto',
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                lineHeight: 1.5,
                                color: 'rgba(255,255,255,0.75)',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-all',
                            }}
                        >
                            {migrationLog.join('\n')}
                        </div>
                    )}
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
