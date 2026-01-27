import React from 'react';
import PortfolioSection from './PortfolioSection';
import personal1 from '../assets/personal_1.png';

const Portraits = () => {
    const images = [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80"
    ];

    return (
        <PortfolioSection
            id="portraits"
            index="06 // PORTRAITS"
            title="EDITORIAL PORTRAITS"
            subtitle="The Human Canvas"
            description="A deep dive into character and soul. Our portraiture session uses light to reveal the unseen facets of your personal brand."
            mainImage={personal1}
            galleryImages={images}
            bookingUrl="https://clicksandposes01.pixieset.com/booking/headshot"
            theme="dark-editorial"
            showDivider={true}
        />
    );
};

export default Portraits;
