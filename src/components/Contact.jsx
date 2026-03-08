import React, { useState, useEffect } from 'react';
import { fetchSectionData } from '../services/portfolioService';
import './Contact.css';

import logo from '../assets/logo.png';

const Contact = () => {
    const [settings, setSettings] = useState({
        contactHeader: 'CONTACT US',
        contactBrandText: 'C L I C K S A N D P O S E S',
        footerQuote: 'We create our happiness by capturing the most important moments in our lives',
        footerCredit: 'DEVELOPED BY SOJKU',
    });

    useEffect(() => {
        const loadSettings = async () => {
            try {
                const data = await fetchSectionData('settings');
                if (data) setSettings(data);
            } catch (err) {
                console.error("Failed to load settings:", err);
            }
        };
        loadSettings();
    }, []);

    return (
        <section className="contact-studio" id="contact">
            <div className="contact-studio-container">
                <div className="contact-visual-side">
                    <h2 className="studio-contact-header">{settings.contactHeader}</h2>
                    <div className="studio-logo-circle">
                        <img src={logo} alt="CLICK & POSES" className="studio-circle-logo-img" />
                        <div className="studio-brand-name">{settings.contactBrandText}</div>
                    </div>
                </div>

                <div className="contact-form-side">
                    <form className="studio-form">
                        <div className="form-group">
                            <label>NAME *</label>
                            <input type="text" required />
                        </div>
                        <div className="form-group">
                            <label>EMAIL ADDRESS *</label>
                            <input type="email" required />
                        </div>
                        <div className="form-group">
                            <label>MESSAGE *</label>
                            <textarea required rows="4"></textarea>
                        </div>
                        <button type="submit" className="studio-send-btn">SEND MESSAGE</button>
                    </form>
                </div>
            </div>

            <div className="studio-footer-note">
                <p style={{ whiteSpace: 'pre-line' }}>{settings.footerQuote}</p>
                <div className="powered-by">{settings.footerCredit}</div>
            </div>
        </section>
    );
};

export default Contact;
