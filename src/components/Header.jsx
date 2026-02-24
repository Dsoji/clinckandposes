import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from '../assets/logo.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <a href="#home" className="logo-link">
            <img src={logo} alt="CLICK & POSES Logo" className="header-logo-img" />
            <span className="logo-text">CLICK & POSES</span>
          </a>
        </div>

        <nav className="header-nav">
          <ul className="nav-links">
            <li><a href="#portfolio">Portfolio</a></li>
            <li><a href="#photobooth">Photobooth</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </nav>

        <div className="header-right">
          <a href="https://clicksandposes01.pixieset.com/booking" target="_blank" rel="noopener noreferrer" className="book-btn-link">
            <button className="book-btn">BOOK A SERVICE</button>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
