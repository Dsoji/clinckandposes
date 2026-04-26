import React, { useEffect, useState } from 'react';
import { fetchSectionData } from '../services/portfolioService';
import './Header.css';
import logo from '../assets/logo.png';

const navItems = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#photobooth', label: 'Photobooth' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact Us' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [settings, setSettings] = useState({
    brandName: 'CLICK & POSES',
    brandFontFamily: "'EB Garamond', serif",
    brandFontSize: '1.8rem',
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await fetchSectionData('settings');
        if (data) setSettings(prev => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to load header settings:", err);
      }
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-left">
          <a href="#home" className="logo-link" onClick={closeMenu}>
            <img src={logo} alt="CLICK & POSES Logo" className="header-logo-img" />
            <span
              className="logo-text"
              style={{
                fontFamily: settings.brandFontFamily,
                fontSize: settings.brandFontSize,
              }}
            >
              {settings.brandName}
            </span>
          </a>
        </div>

        <nav className="header-nav">
          <ul className="nav-links">
            {navItems.map(item => (
              <li key={item.href}><a href={item.href}>{item.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="header-right">
          <a href="https://clicksandposes01.pixieset.com/booking" target="_blank" rel="noopener noreferrer" className="book-btn-link">
            <button className="book-btn">BOOK A SERVICE</button>
          </a>
        </div>

        <button
          type="button"
          className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        className={`mobile-menu-backdrop ${menuOpen ? 'visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <nav>
          <ul className="mobile-nav-links">
            {navItems.map(item => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="https://clicksandposes01.pixieset.com/booking"
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-book-btn"
          onClick={closeMenu}
        >
          BOOK A SERVICE
        </a>
      </aside>
    </header>
  );
};

export default Header;
