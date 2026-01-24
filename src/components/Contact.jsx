import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section" id="contact">
            <div className="section-divider-top"></div>
            <div className="contact-container">
                <div className="contact-header">
                    <div className="hero-chapter-tag">
                        <span className="line-dec"></span>
                        <span className="tag-text">07 // CONTACT</span>
                    </div>
                    <h2 className="contact-massive-title">LET'S CAPTURE<br /><span className="italic">YOUR STORY</span></h2>
                </div>

                <div className="contact-grid">
                    <div className="contact-info">
                        <div className="info-block">
                            <span className="info-label">INQUIRIES</span>
                            <a href="mailto:hello@clickandposes.com" className="info-link">hello@clickandposes.com</a>
                        </div>
                        <div className="info-block">
                            <span className="info-label">LOCATION</span>
                            <p className="info-text">BASED IN LAGOS, NIGERIA<br />AVAILABLE WORLDWIDE</p>
                        </div>
                        <div className="social-links">
                            <a href="#">INSTAGRAM</a>
                            <a href="#">BEHANCE</a>
                            <a href="#">TWITTER</a>
                        </div>
                    </div>

                    <div className="contact-cta">
                        <p className="cta-description">
                            Ready to document your moments? We are currently accepting bookings for 2026.
                            Let's create something timeless together.
                        </p>
                        <button className="contact-book-btn">
                            START A CONVERSATION
                            <span className="btn-line"></span>
                        </button>
                    </div>
                </div>
            </div>

            <footer className="footer-mini">
                <div className="footer-left">© 2026 CLICK & POSES STUDIO. ALL RIGHTS RESERVED.</div>
                <div className="footer-right">BACK TO TOP ↑</div>
            </footer>
        </section>
    );
};

export default Contact;
