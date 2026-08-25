import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import { useLenis } from '@studio-freight/react-lenis';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);
  const { openQuote } = useModal();

  // Tie the parallax directly into the Lenis scroll loop to prevent jitter/lag
  useLenis(({ scroll }) => {
    if (bgRef.current) {
      bgRef.current.style.transform = `translate3d(0, ${scroll * 0.4}px, 0)`;
    }
  });

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="hero-bg" ref={bgRef}></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Premium Car Parts &<br/>
            <span className="text-primary">Expert Diagnostics</span>
          </h1>
          <p className="hero-subtitle">
            Get 100% original parts, top-tier oils, and precise alignment services for your vehicle in Osun State.
          </p>
          
          <div className="hero-ctas">
            <button className="btn-primary hero-btn" onClick={openQuote}>
              Book Service <ChevronRight size={20} />
            </button>
            <button className="btn-outline hero-btn">
              Shop Parts
            </button>
          </div>
        </div>

        {/* Floating Interactive Cards */}
        <div className="hero-stats">
          <div className="glass-card stat-card">
            <div className="stat-value text-primary">100%</div>
            <div className="stat-label">Machine Alignment</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-value text-primary">Original</div>
            <div className="stat-label">Engine Oils & Filters</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-value text-primary">24/7</div>
            <div className="stat-label">Expert Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
