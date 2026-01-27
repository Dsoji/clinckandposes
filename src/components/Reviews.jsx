import React, { useState, useEffect } from 'react';
import './Reviews.css';

const reviewsData = [
    {
        id: 1,
        client: "Sarah & David",
        category: "WEDDING",
        quote: "CLICK & POSES didn't just take photos; they captured the soul of our wedding. Every frame feels like a piece of art.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 2,
        client: "Marcus Smith",
        category: "PORTRAIT",
        quote: "The editorial session was transformative. I've never seen myself represented with such gravity and precision before.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 3,
        client: "Elena Rodriguez",
        category: "EVENT",
        quote: "Professionalism at its peak. They documented our company gala with an eye for detail that was absolutely stunning.",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 4,
        client: "The Henderson Family",
        category: "LIFESTYLE",
        quote: "Timeless memories. The way they work with natural light is pure magic. We will cherish these portraits forever.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80"
    },
    {
        id: 5,
        client: "James Chen",
        category: "COMMERCIAL",
        quote: "Precision and vision. They understood our brand immediately and delivered visuals that surpassed all expectations.",
        image: "https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&w=1200&q=80"
    }
];

const Reviews = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % reviewsData.length);
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
                    {reviewsData.map((review, index) => (
                        <div
                            key={review.id}
                            className={`review-slide ${index === activeIndex ? 'active' : ''}`}
                        >
                            <div className="review-image-wrapper">
                                <img
                                    src={`${review.image}&w=800`}
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
