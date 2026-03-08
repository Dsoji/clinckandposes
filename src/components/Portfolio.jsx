import React, { useState, useEffect } from 'react';
import PortfolioSection from './PortfolioSection';
import { fetchPortfolioData } from '../services/portfolioService';

const Portfolio = () => {
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchPortfolioData();
                if (data) {
                    // Filter out the photobooth section to be rendered separately
                    setSections(data.filter(s => s.id !== 'photobooth'));
                }
            } catch (err) {
                console.error("Failed to load portfolio sections", err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div id="portfolio" style={{ padding: '5rem 0', textAlign: 'center', color: '#d4af37' }}>
                Loading Portfolio...
            </div>
        );
    }

    return (
        <div id="portfolio">
            {sections.map((section, index) => (
                <PortfolioSection
                    key={section.id}
                    id={section.id}
                    index={section.index}
                    title={section.title}
                    subtitle={section.subtitle}
                    description={section.description}
                    mainImage={section.mainImage}
                    galleryImages={section.galleryImages}
                    bookingUrl={section.bookingUrl}
                    theme={section.theme}
                    showDivider={index < sections.length - 1}
                />
            ))}
        </div>
    );
};

export default Portfolio;
