import React from 'react';
import PortfolioSection from './PortfolioSection';
import photobooth2 from '../assets/photobooth2.png';
import photobooth1 from '../assets/photobooth1.jpg';

const PhotoBooth = () => {
    const images = [
        photobooth1,
        photobooth2
    ];

    return (
        <PortfolioSection
            id="photobooth"
            index="05 // PHOTOBOOTH"
            title="PHOTOBOOTH RENTAL"
            subtitle="The Ultimate Party Essential"
            description="Elevate your events with our premium photobooth experience. From unlimited high-quality prints to instant social sharing and custom backdrops, we provide the perfect mix of fun and professional photography."
            mainImage={photobooth2}
            galleryImages={images}
            bookingUrl="https://clicksandposes01.pixieset.com/booking/photobooth-rental/preview"
            theme="noir-dark"
            showDivider={true}
        />
    );
};

export default PhotoBooth;
