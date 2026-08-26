import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import './Footer.css';

export default function Footer() {
  const { openSub } = useModal();

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-grid">
          {/* Brand & Contact */}
          <div className="footer-brand">
            <h2 className="footer-logo">Akilapa<span className="logo-accent">&</span>Sons</h2>
            <p className="footer-desc">
              Your trusted partner for premium car parts, professional auto diagnostics, and expert vehicle maintenance in Osun State.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin size={20} className="contact-icon" />
                <span>No 59, Opposite Government Secretariat, Abeere, Osun State.</span>
              </div>
              <div className="contact-item">
                <Phone size={20} className="contact-icon" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <a href="tel:08035647729" style={{ color: 'inherit' }}>08035647729</a>
                  <a href="tel:08077844998" style={{ color: 'inherit' }}>08077844998</a>
                </div>
              </div>
              <div className="contact-item">
                <Mail size={20} className="contact-icon" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <a href="mailto:info@akilapamultiserviceltd.com" style={{ color: 'inherit' }}>info@akilapamultiserviceltd.com</a>
                  <a href="mailto:olusayoakilapa@gmail.com" style={{ color: 'inherit' }}>olusayoakilapa@gmail.com</a>
                </div>
              </div>
              <div className="contact-item" style={{ alignItems: 'flex-start' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-icon" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <span>Mon-Fri: 9:00am - 6:00pm</span>
                  <span>Sat: 9:30am - 5:00pm</span>
                  <span>Sun: Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3 className="footer-title">Quick Links</h3>
            <ul>
              <li><Link to="/parts">Shop Parts</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/diagnostics">Auto Diagnostics</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Subscriptions */}
          <div className="footer-subscribe">
            <h3 className="footer-title">Stay Updated</h3>
            <p>Subscribe to get notified about new parts and special service offers.</p>
            <form className="subscribe-form" onSubmit={(e) => { e.preventDefault(); openSub(); }}>
              <input type="email" placeholder="Enter your email" required />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
            <div className="social-links" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <a href="#" aria-label="Facebook" style={{ color: '#fff', fontWeight: 'bold' }}>Fb</a>
              <a href="#" aria-label="Instagram" style={{ color: '#fff', fontWeight: 'bold' }}>Ig</a>
              <a href="#" aria-label="Twitter" style={{ color: '#fff', fontWeight: 'bold' }}>Tw</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Akilapa & Sons Auto Workshop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
