import React, { useEffect, useRef, useState, useCallback } from 'react';
import { fetchSectionData } from '../services/portfolioService';
import useSwipe from '../hooks/useSwipe';
import './Hero.css';
import homeBackground from '../assets/home_background.jpg';

const SLIDE_INTERVAL_MS = 6000;

const Hero = () => {
    const sectionRef = useRef(null);
    const autoplayRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeSlide, setActiveSlide] = useState(0);
    const [heroData, setHeroData] = useState({ slides: [] });

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

    useEffect(() => {
        const loadMetadata = async () => {
            try {
                const data = await fetchSectionData('hero');
                if (data) setHeroData(prev => ({ ...prev, ...data, slides: data.slides || [] }));
            } catch (err) {
                console.error("Failed to load hero metadata:", err);
            }
        };
        loadMetadata();
    }, []);

    const slides = (heroData.slides && heroData.slides.length > 0)
        ? heroData.slides
        : [{ id: 'fallback', url: homeBackground }];

    const slideCount = slides.length;

    const startAutoplay = useCallback(() => {
        if (autoplayRef.current) clearInterval(autoplayRef.current);
        if (slideCount <= 1) return;
        autoplayRef.current = setInterval(() => {
            setActiveSlide(prev => (prev + 1) % slideCount);
        }, SLIDE_INTERVAL_MS);
    }, [slideCount]);

    useEffect(() => {
        startAutoplay();
        return () => {
            if (autoplayRef.current) clearInterval(autoplayRef.current);
        };
    }, [startAutoplay]);

    const goToSlide = (index) => {
        setActiveSlide(((index % slideCount) + slideCount) % slideCount);
        startAutoplay();
    };

    const prevSlide = () => goToSlide(activeSlide - 1);
    const nextSlide = () => goToSlide(activeSlide + 1);

    const swipeHandlers = useSwipe({
        onSwipeLeft: nextSlide,
        onSwipeRight: prevSlide,
    });

    return (
        <section className="hero-exhibition" ref={sectionRef} id="home">
            <div className="hero-bg-wrapper" {...swipeHandlers}>
                <div className="hero-mask" style={{ clipPath: `inset(0% 0% ${scrollProgress * 20}% 0%)` }}>
                    <div className="hero-slideshow">
                        {slides.map((slide, i) => (
                            <img
                                key={slide.id || i}
                                src={slide.url}
                                alt={`Hero slide ${i + 1}`}
                                className={`hero-slide ${i === activeSlide ? 'active' : ''}`}
                                style={{ transform: `scale(${1.1 + scrollProgress * 0.1}) translateY(${scrollProgress * 100}px)` }}
                            />
                        ))}
                    </div>
                </div>
                <div className="hero-overlay-noir"></div>

                {slideCount > 1 && (
                    <>
                        <button
                            type="button"
                            className="hero-slide-arrow prev"
                            onClick={prevSlide}
                            aria-label="Previous slide"
                        >
                            <span aria-hidden="true">‹</span>
                        </button>
                        <button
                            type="button"
                            className="hero-slide-arrow next"
                            onClick={nextSlide}
                            aria-label="Next slide"
                        >
                            <span aria-hidden="true">›</span>
                        </button>

                        <div className="hero-slide-indicators">
                            {slides.map((slide, i) => (
                                <button
                                    key={slide.id || i}
                                    className={`hero-slide-dot ${i === activeSlide ? 'active' : ''}`}
                                    onClick={() => goToSlide(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Hero;
