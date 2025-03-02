import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>FlatFinder</h3>
          <p>Find your perfect apartment or house easily.</p>
        </div>
        
        <div className="footer-section">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search Properties</Link></li>
            <li><Link to="/dashboard">My Account</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/imprint">Imprint</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@flatfinder.com</p>
          <p>Phone: +41 123 456 789</p>
          <div className="social-links">
            <a href="#" className="social-icon">FB</a>
            <a href="#" className="social-icon">IG</a>
            <a href="#" className="social-icon">TW</a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>&copy; 2025 FlatFinder. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;