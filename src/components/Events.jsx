import React from 'react';
import PortfolioSection from './PortfolioSection';
import birthday1 from '../assets/birthday_1.png';

const Events = () => {
    const images = [
        "https://images.unsplash.com/photo-1464347601390-25e2842a37f7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1530103862676-fa8c91bbe348?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1533294160622-d5fece3e080d?auto=format&fit=crop&w=600&q=80"
    ];

    return (
        <PortfolioSection
            id="events"
            index="04 // EVENTS"
            title="EVENT COLLECTIONS"
            subtitle="Milestones in Motion"
            description="Beyond cakes and candles, we document the energy of life passing through time. Professional coverage for birthdays and corporate events."
            mainImage={birthday1}
            galleryImages={images}
            bookingUrl="https://clicksandposes01.pixieset.com/booking/events"
            theme="gold-accent"
            showDivider={true}
        />
    );
};

export default Events;
