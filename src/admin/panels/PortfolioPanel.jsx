import React, { useState, useRef } from 'react';

import wedding1 from '../../assets/wedding_1.png';
import wedding2 from '../../assets/wedding_2.png';
import birthday1 from '../../assets/birthday_1.png';
import personal1 from '../../assets/personal_1.png';
import photobooth1 from '../../assets/photobooth1.jpg';
import photobooth2 from '../../assets/photobooth2.png';

const defaultSections = [
    {
        id: 'wedding',
        index: '03 // PORTFOLIO',
        title: 'WEDDING PORTFOLIO',
        subtitle: 'The Eternal Vow',
        description: 'Capturing the silent whispers and grand declarations of love. Our wedding photography is a professional exploration of your most sacred day.',
        bookingUrl: 'https://clicksandposes01.pixieset.com/booking',
        theme: 'light-text',
        mainImage: wedding1,
        galleryImages: [
            wedding2,
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80",
        ],
    },
    {
        id: 'events',
        index: '04 // PORTFOLIO',
        title: 'EVENT COLLECTIONS',
        subtitle: 'Milestones in Motion',
        description: 'Beyond cakes and candles, we document the energy of life passing through time. Professional coverage for birthdays and corporate events.',
        bookingUrl: 'https://clicksandposes01.pixieset.com/booking/events',
        theme: 'gold-accent',
        mainImage: birthday1,
        galleryImages: [
            "https://images.unsplash.com/photo-1464347601390-25e2842a37f7?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1530103862676-fa8c91bbe348?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&w=600&q=80",
        ],
    },
    {
        id: 'portraits',
        index: '05 // PORTFOLIO',
        title: 'EDITORIAL PORTRAITS',
        subtitle: 'The Human Canvas',
        description: 'A deep dive into character and soul. Our portraiture session uses light to reveal the unseen facets of your personal brand.',
        bookingUrl: 'https://clicksandposes01.pixieset.com/booking/headshot',
        theme: 'dark-editorial',
        mainImage: personal1,
        galleryImages: [
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
        ],
    },
    {
        id: 'photobooth',
        index: '06 // RENTAL',
        title: 'PHOTOBOOTH RENTAL',
        subtitle: 'The Ultimate Party Essential',
        description: 'Elevate your events with our premium photobooth experience. From unlimited high-quality prints to instant social sharing and custom backdrops, we provide the perfect mix of fun and professional photography.',
        bookingUrl: 'https://clicksandposes01.pixieset.com/booking/photobooth-rental/preview',
        theme: 'noir-dark',
        mainImage: photobooth2,
        galleryImages: [
            photobooth1,
            photobooth2,
        ],
    },
];

const PortfolioPanel = () => {
    const [sections, setSections] = useState(() => {
        const saved = localStorage.getItem('cp_portfolio_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return defaultSections;
            }
        }
        return defaultSections;
    });
    const [editingId, setEditingId] = useState(null);
    const mainImageRef = useRef(null);
    const galleryImageRef = useRef(null);

    const handleChange = (id, field, value) => {
        setSections(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const handleMainImageUpload = (id, e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            handleChange(id, 'mainImage', reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGalleryImageUpload = (id, e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                setSections(prev => prev.map(s => {
                    if (s.id !== id) return s;
                    return { ...s, galleryImages: [...(s.galleryImages || []), reader.result] };
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeGalleryImage = (sectionId, imageIndex) => {
        setSections(prev => prev.map(s => {
            if (s.id !== sectionId) return s;
            const updated = [...s.galleryImages];
            updated.splice(imageIndex, 1);
            return { ...s, galleryImages: updated };
        }));
    };

    const removeMainImage = (sectionId) => {
        handleChange(sectionId, 'mainImage', null);
    };

    const handleSave = () => {
        localStorage.setItem('cp_portfolio_data', JSON.stringify(sections));
        setEditingId(null);
        alert('Portfolio sections saved!');
    };

    return (
        <div>
            <div className="panel-header">
                <p className="panel-description">
                    Manage all portfolio sections. Edit titles, descriptions, images, and booking links.
                </p>
                <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save All</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {sections.map((section) => (
                    <div className="admin-card" key={section.id}>
                        <div className="admin-card-header">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                                {/* Thumbnail preview */}
                                {section.mainImage && (
                                    <img
                                        src={section.mainImage}
                                        alt={section.title}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            objectFit: 'cover',
                                            borderRadius: '8px',
                                            border: '2px solid rgba(212,175,55,0.2)',
                                        }}
                                    />
                                )}
                                <div>
                                    <h3 className="admin-card-title">{section.title}</h3>
                                    <span className="admin-card-subtitle">{section.index}</span>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <span className="badge badge-gold">{section.theme}</span>
                                <span className="badge badge-grey">
                                    {(section.galleryImages || []).length} images
                                </span>
                                <button
                                    className="admin-btn admin-btn-ghost"
                                    onClick={() => setEditingId(editingId === section.id ? null : section.id)}
                                >
                                    {editingId === section.id ? 'Close' : 'Edit'}
                                </button>
                            </div>
                        </div>

                        {editingId === section.id && (
                            <div style={{ marginTop: '1.5rem' }}>
                                {/* Text Fields */}
                                <div className="admin-grid-2">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Title</label>
                                        <input
                                            className="admin-input"
                                            type="text"
                                            value={section.title}
                                            onChange={(e) => handleChange(section.id, 'title', e.target.value)}
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Subtitle</label>
                                        <input
                                            className="admin-input"
                                            type="text"
                                            value={section.subtitle}
                                            onChange={(e) => handleChange(section.id, 'subtitle', e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Description</label>
                                    <textarea
                                        className="admin-textarea"
                                        value={section.description}
                                        onChange={(e) => handleChange(section.id, 'description', e.target.value)}
                                        rows="3"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Booking URL</label>
                                    <input
                                        className="admin-input"
                                        type="url"
                                        value={section.bookingUrl}
                                        onChange={(e) => handleChange(section.id, 'bookingUrl', e.target.value)}
                                    />
                                </div>

                                {/* Main Image */}
                                <div style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <label className="admin-form-label" style={{ marginBottom: '1rem', display: 'block' }}>Main Image</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                                        {section.mainImage ? (
                                            <div style={{ position: 'relative' }}>
                                                <img
                                                    src={section.mainImage}
                                                    alt="Main"
                                                    style={{
                                                        width: '200px',
                                                        height: '140px',
                                                        objectFit: 'cover',
                                                        borderRadius: '10px',
                                                        border: '2px solid rgba(212,175,55,0.2)',
                                                    }}
                                                />
                                                <button
                                                    onClick={() => removeMainImage(section.id)}
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
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => mainImageRef.current?.click()}
                                                style={{
                                                    width: '200px',
                                                    height: '140px',
                                                    borderRadius: '10px',
                                                    border: '2px dashed rgba(255,255,255,0.1)',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    transition: 'border-color 0.3s',
                                                    gap: '0.5rem',
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)'}
                                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                                            >
                                                <span style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)' }}>+</span>
                                                <span style={{ fontSize: '0.65rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>Upload Image</span>
                                            </div>
                                        )}
                                        <input
                                            ref={mainImageRef}
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            onChange={(e) => handleMainImageUpload(section.id, e)}
                                        />
                                        {section.mainImage && (
                                            <button
                                                className="admin-btn admin-btn-ghost"
                                                onClick={() => mainImageRef.current?.click()}
                                                style={{ padding: '0.6rem 1.2rem' }}
                                            >Replace</button>
                                        )}
                                    </div>
                                </div>

                                {/* Gallery Images */}
                                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                        <label className="admin-form-label">Gallery Images</label>
                                        <button
                                            className="admin-btn admin-btn-ghost"
                                            onClick={() => galleryImageRef.current?.click()}
                                            style={{ padding: '0.5rem 1rem', fontSize: '0.6rem' }}
                                        >+ Add Images</button>
                                    </div>

                                    <input
                                        ref={galleryImageRef}
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        style={{ display: 'none' }}
                                        onChange={(e) => handleGalleryImageUpload(section.id, e)}
                                    />

                                    {(section.galleryImages || []).length > 0 ? (
                                        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                                            {section.galleryImages.map((img, idx) => (
                                                <div key={idx} style={{ position: 'relative' }}>
                                                    <img
                                                        src={img}
                                                        alt={`Gallery ${idx + 1}`}
                                                        style={{
                                                            width: '120px',
                                                            height: '90px',
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            border: '1px solid rgba(255,255,255,0.08)',
                                                        }}
                                                    />
                                                    <button
                                                        onClick={() => removeGalleryImage(section.id, idx)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '-6px',
                                                            right: '-6px',
                                                            width: '20px',
                                                            height: '20px',
                                                            borderRadius: '50%',
                                                            background: '#dc3545',
                                                            color: '#fff',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            fontSize: '10px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >✕</button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div
                                            onClick={() => galleryImageRef.current?.click()}
                                            style={{
                                                padding: '2rem',
                                                borderRadius: '10px',
                                                border: '2px dashed rgba(255,255,255,0.08)',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                transition: 'border-color 0.3s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)'}
                                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                                        >
                                            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                                                Click to upload gallery images
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PortfolioPanel;
