import React, { useState, useEffect } from 'react';
import { fetchSectionData } from '../services/portfolioService';
import './Reviews.css';

const Reviews = () => {
    const [reviewsData, setReviewsData] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const loadReviews = async () => {
            try {
                const data = await fetchSectionData('reviews');
                if (data && Array.isArray(data)) {
                    setReviewsData(data);
                }
            } catch (err) {
                console.error("Failed to load reviews:", err);
            }
        };
        loadReviews();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (reviewsData.length > 0) {
                setActiveIndex((prev) => (prev + 1) % reviewsData.length);
            }
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="reviews-section" id="reviews">
            <div className="section-divider-top"></div>

            <div className="reviews-container">
                <div className="reviews-header">
                    <div className="hero-chapter-tag">
                        <span className="line-dec"></span>
                        <span className="tag-text">07 // REVIEWS</span>
                    </div>
                    <h2 className="reviews-title-mini">VOICES OF EXPERIENCE</h2>
                </div>

                <div className="reviews-slideshow">
                    {reviewsData.length === 0 && <div style={{ color: 'var(--gold)' }}>Loading reviews...</div>}
                    {reviewsData.map((review, index) => (
                        <div
                            key={review.id}
                            className={`review-slide ${index === activeIndex ? 'active' : ''}`}
                        >
                            <div className="review-image-wrapper">
                                <img
                                    src={review.image && review.image.includes('unsplash') ? `${review.image}&w=800` : review.image || ''}
                                    alt={review.client}
                                    className="review-image"
                                    loading="lazy"
                                />
                                <div className="review-image-overlay"></div>
                            </div>

                            <div className="review-content">
                                <span className="review-category">{review.category}</span>
                                <blockquote className="review-quote">
                                    "{review.quote}"
                                </blockquote>
                                <div className="review-footer">
                                    <span className="review-client">{review.client}</span>
                                    <div className="review-nav-dots">
                                        {reviewsData.map((_, i) => (
                                            <button
                                                key={i}
                                                className={`dot ${i === activeIndex ? 'active' : ''}`}
                                                onClick={() => setActiveIndex(i)}
                                            ></button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
