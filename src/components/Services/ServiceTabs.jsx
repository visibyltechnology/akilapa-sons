import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Wrench, Droplet, Zap } from 'lucide-react';
import { useModal } from '../../context/ModalContext';
import './ServiceTabs.css';

const services = [
  {
    id: 'diagnostics',
    title: 'Computerized Diagnostics',
    icon: <Zap size={24} />,
    description: 'State-of-the-art vehicle diagnostic machine to pinpoint engine, transmission, and electrical issues accurately.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'wheel',
    title: 'Digital Wheel Services',
    icon: <Settings size={24} />,
    description: 'Precision digital wheel alignment and balancing. We fix pulling, uneven tyre wear, and steering vibrations.',
    image: 'https://images.unsplash.com/photo-1615437893116-2c9388339178?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fluid',
    title: 'Fluid & Oil Care',
    icon: <Droplet size={24} />,
    description: 'Professional oil draining machines for quick, clean, and complete fluid replacement using original oils.',
    image: 'https://images.unsplash.com/photo-1605333856230-08c34fbc4db0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'fitting',
    title: 'Machine Tyre Fitting',
    icon: <Wrench size={24} />,
    description: 'Scratch-free tyre removal and fitting using advanced hydraulic tyre machines. Perfect for alloy wheels.',
    image: 'https://images.unsplash.com/photo-1590401826012-70b86a34791a?auto=format&fit=crop&q=80&w=600'
  }
];

export default function ServiceTabs() {
  const [activeTab, setActiveTab] = useState(services[0]);
  const { openQuote } = useModal();

  return (
    <section className="section-padding services-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Expert <span className="text-primary">Services</span></h2>
          <p className="section-subtitle">Advanced machinery for ultimate precision.</p>
        </div>

        <div className="services-container glass-card">
          <div className="services-tabs">
            {services.map(service => (
              <button
                key={service.id}
                className={`tab-btn ${activeTab.id === service.id ? 'active' : ''}`}
                onClick={() => setActiveTab(service)}
              >
                <span className="tab-icon">{service.icon}</span>
                <span className="tab-title">{service.title}</span>
                {activeTab.id === service.id && (
                  <motion.div
                    className="tab-indicator"
                    layoutId="activeTabIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="services-content">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="service-panel"
              >
                <div className="service-info">
                  <h3>{activeTab.title}</h3>
                  <p>{activeTab.description}</p>
                  <button className="btn-primary mt-4" onClick={openQuote}>Book Service</button>
                </div>
                <div className="service-image-wrapper">
                  <img src={activeTab.image} alt={activeTab.title} className="service-image" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
