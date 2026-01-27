import React from 'react';
import './Contact.css';

import logo from '../assets/logo.png';

const Contact = () => {
    return (
        <section className="contact-studio" id="contact">
            <div className="contact-studio-container">
                <div className="contact-visual-side">
                    <h2 className="studio-contact-header">CONTACT US</h2>
                    <div className="studio-logo-circle">
                        <img src={logo} alt="CLICK & POSES" className="studio-circle-logo-img" />
                        <div className="studio-brand-name">C L I C K S A N D P O S E S</div>
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
                <p>We create our happiness by capturing the most important moments in our lives</p>
                <div className="powered-by">DEVELOPED BY SOJKU</div>
            </div>
        </section>
    );
};

export default Contact;
