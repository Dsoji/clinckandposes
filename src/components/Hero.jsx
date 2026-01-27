import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';
import homeBackground from '../assets/home_background.jpg';
import wedding1 from '../assets/wedding_1.png';
import birthday1 from '../assets/birthday_1.png';
import personal1 from '../assets/personal_1.png';

const Hero = () => {
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

    const featuredPrints = [
        { img: wedding1, pos: { top: '15%', left: '10%' }, delay: '0.2s', rot: '-5deg' },
        { img: birthday1, pos: { top: '20%', right: '12%' }, delay: '0.4s', rot: '8deg' },
        { img: personal1, pos: { bottom: '15%', left: '15%' }, delay: '0.6s', rot: '4deg' },
        { img: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80", pos: { bottom: '20%', right: '8%' }, delay: '0.8s', rot: '-3deg' }
    ];

    return (
        <section className="hero-exhibition" ref={sectionRef} id="home">
            <div className="hero-bg-wrapper">
                <div className="hero-mask" style={{ clipPath: `inset(0% 0% ${scrollProgress * 20}% 0%)` }}>
                    <img
                        src={homeBackground}
                        alt="Exhibition Background"
                        className="hero-parallax-img"
                        style={{ transform: `scale(${1.1 + scrollProgress * 0.1}) translateY(${scrollProgress * 100}px)` }}
                    />
                </div>
                <div className="hero-overlay-noir"></div>

                <div
                    className="hero-watermark"
                    style={{ transform: `translate(-50%, calc(-50% + ${scrollProgress * 150}px))` }}
                >
                    CLICK & POSES
                </div>

                <div className="hero-content-editorial">
                    <div className="hero-floating-prints">
                        {featuredPrints.map((print, i) => (
                            <div
                                key={i}
                                className="hero-print-card"
                                style={{
                                    ...print.pos,
                                    animationDelay: print.delay,
                                    transform: `rotate(${print.rot}) translateY(${(0.5 - scrollProgress) * (40 * (i + 1))}px)`
                                }}
                            >
                                <img
                                    src={print.img.includes('unsplash') ? `${print.img}&w=500` : print.img}
                                    alt="Featured Print"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="hero-main-narrative">
                        <div className="hero-chapter-tag">
                            <span className="line-dec"></span>
                            <span className="tag-text">01 // HOME</span>
                        </div>

                        <h1 className="hero-massive-title">
                            <span className="title-row">CLICK & POSES</span>
                            <span className="title-row accent">CAPTURING MOMENTS</span>
                        </h1>
                    </div>

                    <div className="hero-editorial-footer">
                        <p className="hero-short-dec">
                            A premium collection of commercial and personal photography. <br />
                            Crafting timeless narratives through the lens of precision.
                        </p>
                        <div className="hero-scroll-invite">
                            <span className="arrow-down">↓</span>
                            <span className="invite-text">DISCOVER THE WORK</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
