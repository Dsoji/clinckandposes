import React from 'react';
import PortfolioSection from './PortfolioSection';
import wedding1 from '../assets/wedding_1.png';
import wedding2 from '../assets/wedding_2.png';

const Wedding = () => {
    const images = [
        wedding2,
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80"
    ];

    return (
        <PortfolioSection
            id="wedding"
            index="03 // WEDDING"
            title="WEDDING PORTFOLIO"
            subtitle="The Eternal Vow"
            description="Capturing the silent whispers and grand declarations of love. Our wedding photography is a professional exploration of your most sacred day."
            mainImage={wedding1}
            galleryImages={images}
            theme="light-text"
            showDivider={true}
        />
    );
};

export default Wedding;
