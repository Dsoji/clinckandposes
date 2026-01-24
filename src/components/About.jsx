import React, { useEffect, useRef, useState } from 'react';
import './About.css';
import aboutLens from '../assets/about_lens.png';

const About = () => {
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
        <section className="about-exhibition" ref={sectionRef} id="about">
            <div className="section-divider-top"></div>
            <div className="about-pulp-row">
                <div className="about-marker-cell">
                    <div className="about-chapter-marker">
                        <span className="line-dec"></span>
                        <span className="tag-text">02 // STUDIO</span>
                    </div>
                </div>

                <div className="about-title-cell">
                    <h2 className="about-massive-title" style={{ transform: `translateX(${(scrollProgress - 0.5) * 30}px)` }}>
                        THE ART<br />
                        <span className="shifted">OF VISION</span>
                    </h2>
                </div>

                <div className="about-narrative-cell">
                    <div className="about-narrative">
                        <p className="narrative-lead">
                            We believe that every moment is a story waiting to be told, and we specialize in
                            transforming these stories into captivating visual narratives.
                        </p>
                        <p className="narrative-body">
                            Our team, led by Graphic Smith, is dedicated to capturing the essence of each moment.
                            We don't just take pictures; we create visual experiences that resonate.
                        </p>
                        <button className="about-discover-btn">
                            LEARN MORE
                            <span className="btn-line"></span>
                        </button>
                    </div>
                </div>

                <div className="about-visual-cell">
                    <div className="lens-exhibit-container" style={{ transform: `rotate(${(scrollProgress - 0.5) * 10}deg)` }}>
                        <div className="lens-floating-card">
                            <img src={aboutLens} alt="CLICK & POSES Master Logo" className="lens-image-exhibit" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="about-bg-accent">
                <span className="bg-text-vertical">CLICK & POSES STUDIO</span>
            </div>
        </section>
    );
};

export default About;
