import React, { useState, useEffect } from 'react';
import { fetchSectionData } from '../services/portfolioService';
import useSwipe from '../hooks/useSwipe';
import { responsiveImage } from '../utils/responsiveImage';
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
        if (reviewsData.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviewsData.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [reviewsData.length]);

    const goTo = (i) => {
        if (reviewsData.length === 0) return;
        const len = reviewsData.length;
        setActiveIndex(((i % len) + len) % len);
    };

    const swipeHandlers = useSwipe({
        onSwipeLeft: () => goTo(activeIndex + 1),
        onSwipeRight: () => goTo(activeIndex - 1),
    });

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

                <div className="reviews-slideshow" {...swipeHandlers}>
                    {reviewsData.length === 0 && <div style={{ color: 'var(--gold)' }}>Loading reviews...</div>}
                    {reviewsData.map((review, index) => (
                        <div
                            key={review.id}
                            className={`review-slide ${index === activeIndex ? 'active' : ''}`}
                        >
                            <div className="review-image-wrapper">
                                <img
                                    {...responsiveImage(review.image || '', '(max-width: 1024px) 100vw, 50vw')}
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
                                                onClick={() => goTo(i)}
                                                aria-label={`Show review ${i + 1}`}
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
