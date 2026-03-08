import React, { useState, useEffect } from 'react';
import PortfolioSection from './PortfolioSection';
import { fetchPortfolioData } from '../services/portfolioService';

const PhotoBooth = () => {
    const [section, setSection] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchPortfolioData();
                if (data) {
                    const pbSection = data.find(s => s.id === 'photobooth');
                    if (pbSection) {
                        setSection(pbSection);
                    }
                }
            } catch (err) {
                console.error("Failed to load photobooth section", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '5rem 0', textAlign: 'center', color: '#d4af37' }}>
                Loading PhotoBooth...
            </div>
        );
    }

    if (!section) return null; // Hide completely if there's no data

    return (
        <PortfolioSection
            id={section.id}
            index={section.index}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            mainImage={section.mainImage}
            galleryImages={section.galleryImages}
            bookingUrl={section.bookingUrl}
            theme={section.theme}
            showDivider={true}
        />
    );
};

export default PhotoBooth;
