import React, { useState, useEffect, useRef } from 'react';
import { fetchSectionData, saveSectionData, uploadImage } from '../../services/portfolioService';

const defaultHeroData = {
    titleRow1: 'CLICK & POSES',
    titleRow2: 'CAPTURING MOMENTS',
    tagline: 'A premium collection of commercial and personal photography.\nCrafting timeless narratives through the lens of precision.',
    chapterTag: '01 // HOME',
    scrollText: 'DISCOVER THE WORK',
    slides: [],
};

const HeroPanel = () => {
    const [heroData, setHeroData] = useState(defaultHeroData);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const slideInputRef = useRef(null);

    useEffect(() => {
        const loadMetadata = async () => {
            try {
                const data = await fetchSectionData('hero');
                if (data) {
                    setHeroData({
                        ...defaultHeroData,
                        ...data,
                        slides: Array.isArray(data.slides) ? data.slides : [],
                    });
                }
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
            alert('Hero content saved successfully!');
        } catch (err) {
            console.error("Failed to save hero metadata:", err);
            alert('Failed to save. Check permissions.');
        } finally {
            setSaving(false);
        }
    };

    const handleReset = () => {
        setHeroData({ ...defaultHeroData, slides: heroData.slides });
    };

    const handleSlideUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;
        setUploading(true);
        try {
            const urls = await Promise.all(
                files.map(file => uploadImage(file, 'hero_slides'))
            );
            const newSlides = urls.map(url => ({ id: `slide_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, url }));
            setHeroData(prev => ({ ...prev, slides: [...(prev.slides || []), ...newSlides] }));
        } catch (err) {
            console.error(err);
            alert('Failed to upload slideshow images.');
        } finally {
            setUploading(false);
            if (slideInputRef.current) slideInputRef.current.value = '';
        }
    };

    const removeSlide = (slideId) => {
        setHeroData(prev => ({
            ...prev,
            slides: (prev.slides || []).filter(s => s.id !== slideId),
        }));
    };

    const moveSlide = (index, direction) => {
        setHeroData(prev => {
            const slides = [...(prev.slides || [])];
            const newIndex = index + direction;
            if (newIndex < 0 || newIndex >= slides.length) return prev;
            [slides[index], slides[newIndex]] = [slides[newIndex], slides[index]];
            return { ...prev, slides };
        });
    };

    const slides = heroData.slides || [];

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Edit the main landing section of your website. Changes will be reflected on the home page.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    {loading && <span style={{ color: 'var(--gold)' }}>Loading...</span>}
                    <button className="admin-btn admin-btn-ghost" onClick={handleReset}>Reset Text</button>
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

            <div className="admin-card" style={{ marginTop: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                        <h3 className="admin-card-title">Hero Slideshow</h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)', margin: '0.4rem 0 0', fontSize: '0.8rem' }}>
                            Wide-view photos that auto-advance on the home page. Upload landscape images for best results. Don't forget to click <strong>Save Changes</strong> after uploading or reordering.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span className="badge badge-grey">{slides.length} slide{slides.length === 1 ? '' : 's'}</span>
                        <button
                            className="admin-btn admin-btn-ghost"
                            onClick={() => slideInputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? 'Uploading...' : '+ Add Photos'}
                        </button>
                    </div>
                </div>

                <input
                    ref={slideInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleSlideUpload}
                />

                {slides.length > 0 ? (
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {slides.map((slide, idx) => (
                            <div
                                key={slide.id}
                                style={{
                                    position: 'relative',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '10px',
                                    overflow: 'hidden',
                                    background: '#0a0a0a',
                                }}
                            >
                                <img
                                    src={slide.url}
                                    alt={`Slide ${idx + 1}`}
                                    style={{
                                        width: '220px',
                                        height: '130px',
                                        objectFit: 'cover',
                                        display: 'block',
                                    }}
                                />
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '6px',
                                        left: '6px',
                                        background: 'rgba(0,0,0,0.7)',
                                        color: 'var(--color-gold, #d4af37)',
                                        padding: '2px 8px',
                                        borderRadius: '4px',
                                        fontSize: '0.7rem',
                                        fontWeight: 600,
                                        letterSpacing: '1px',
                                    }}
                                >
                                    #{idx + 1}
                                </div>
                                <button
                                    onClick={() => removeSlide(slide.id)}
                                    title="Remove slide"
                                    style={{
                                        position: 'absolute',
                                        top: '-8px',
                                        right: '-8px',
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        background: '#dc3545',
                                        color: '#fff',
                                        border: 'none',
                                        cursor: 'pointer',
                                        fontSize: '12px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >✕</button>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        gap: '0.25rem',
                                        padding: '0.4rem',
                                        background: 'rgba(0,0,0,0.6)',
                                    }}
                                >
                                    <button
                                        onClick={() => moveSlide(idx, -1)}
                                        disabled={idx === 0}
                                        title="Move left"
                                        style={{
                                            flex: 1,
                                            padding: '0.3rem',
                                            background: 'rgba(255,255,255,0.06)',
                                            color: idx === 0 ? 'rgba(255,255,255,0.2)' : '#fff',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '4px',
                                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                            fontSize: '0.75rem',
                                        }}
                                    >←</button>
                                    <button
                                        onClick={() => moveSlide(idx, 1)}
                                        disabled={idx === slides.length - 1}
                                        title="Move right"
                                        style={{
                                            flex: 1,
                                            padding: '0.3rem',
                                            background: 'rgba(255,255,255,0.06)',
                                            color: idx === slides.length - 1 ? 'rgba(255,255,255,0.2)' : '#fff',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '4px',
                                            cursor: idx === slides.length - 1 ? 'not-allowed' : 'pointer',
                                            fontSize: '0.75rem',
                                        }}
                                    >→</button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div
                        onClick={() => slideInputRef.current?.click()}
                        style={{
                            padding: '2.5rem',
                            borderRadius: '10px',
                            border: '2px dashed rgba(255,255,255,0.1)',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'border-color 0.3s',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    >
                        <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                            Click to upload hero slideshow photos
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroPanel;
