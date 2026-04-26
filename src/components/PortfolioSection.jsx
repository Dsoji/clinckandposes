import React, { useEffect, useRef, useState } from 'react';
import { responsiveImage } from '../utils/responsiveImage';
import './PortfolioSection.css';

const PortfolioSection = ({ id, index, title, subtitle, description, mainImage, galleryImages, theme, bookingUrl, showDivider = true }) => {
    const sectionRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className={`portfolio-section ${theme}`} ref={sectionRef} id={id}>
            {showDivider && <div className="section-divider-top"></div>}

            <div className="portfolio-bg">
                <div className="mask-wrapper" style={{ clipPath: `inset(${(1 - scrollProgress) * 20}% 0% 0% 0%)` }}>
                    <img
                        {...responsiveImage(mainImage, '100vw')}
                        alt={title}
                        className="parallax-bg"
                        loading="lazy"
                        style={{ transform: `scale(${1.1 + scrollProgress * 0.1}) translateY(${(scrollProgress - 0.5) * 100}px)` }}
                    />
                </div>
                <div className="portfolio-overlay"></div>
            </div>

            <div className="portfolio-content">
                <div className="portfolio-header">
                    <div className="hero-chapter-tag">
                        <span className="line-dec"></span>
                        <span className="tag-text">{index}</span>
                    </div>
                    <div className="portfolio-titles">
                        <h3 className="portfolio-title-large">{title}</h3>
                        <h4 className="portfolio-subtitle">{subtitle}</h4>
                    </div>
                </div>

                <div className="portfolio-details">
                    <p className="portfolio-description">{description}</p>

                    {bookingUrl && (
                        <div className="portfolio-cta">
                            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="book-now-btn">
                                BOOK THIS SERVICE
                                <span className="btn-line"></span>
                            </a>
                        </div>
                    )}

                    <div className="floating-slideshow-wrapper" style={{ transform: `translateY(${(scrollProgress - 0.5) * 50}px)` }}>
                        <div className="slideshow-track">
                            {galleryImages.concat(galleryImages).map((img, i) => (
                                <div key={i} className="floating-card">
                                    <img
                                        {...responsiveImage(img, '(max-width: 480px) 200px, (max-width: 768px) 280px, 500px')}
                                        alt={`${title} Detail`}
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="portfolio-footer-divider">
                <div className="divider-line" style={{ width: `${scrollProgress * 100}%` }}></div>
            </div>
        </section>
    );
};

export default PortfolioSection;
