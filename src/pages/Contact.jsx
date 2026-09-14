import React from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We will get back to you shortly.');
  };

  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <div className="container">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            Get in touch with Akilapa & Sons. We are always ready to assist you with premium car parts and expert diagnostics.
          </p>
        </div>
      </div>

      <div className="container contact-container">
        {/* Contact Information Cards */}
        <div className="contact-grid">
          
          {/* Info Card: Location */}
          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <MapPin size={28} />
            </div>
            <h3>Our Location</h3>
            <p>No 59, Opposite Government Secretariat,<br/>Abeere, Osun State.</p>
          </div>

          {/* Info Card: Phone */}
          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Phone size={28} />
            </div>
            <h3>Call Us</h3>
            <p><a href="tel:08035647729">08035647729</a></p>
            <p><a href="tel:08077844998">08077844998</a></p>
          </div>

          {/* Info Card: Email */}
          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Mail size={28} />
            </div>
            <h3>Email Us</h3>
            <p><a href="mailto:info@akilapamultiservices.com.ng">info@akilapamultiservices.com.ng</a></p>
            <p><a href="mailto:olusayoakilapa@gmail.com">olusayoakilapa@gmail.com</a></p>
          </div>

          {/* Info Card: Business Hours */}
          <div className="contact-info-card">
            <div className="contact-icon-wrapper">
              <Clock size={28} />
            </div>
            <h3>Business Hours</h3>
            <p>Mon - Fri: 9:00am - 6:00pm</p>
            <p>Sat: 9:30am - 5:00pm</p>
            <p>Sun: Closed</p>
          </div>
          
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section glass-card">
          <div className="contact-form-content">
            <h2>Send Us a Message</h2>
            <p>Have a specific question about a part or need a diagnostic estimate? Fill out the form below and we will get back to you.</p>
            
            <form className="contact-form" onSubmit={handleFormSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input type="text" placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input type="email" placeholder="john@example.com" required />
                </div>
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input type="text" placeholder="e.g. Inquiry about Engine Oil" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn-primary contact-submit">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          {/* Map Placeholder */}
          <div className="contact-map">
             <iframe
                title="Akilapa & Sons Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.404870425964!2d4.538356!3d7.2862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037eb5f0ef35201%3A0xc3f6a27e02e07eb2!2sState%20Secretariat%2C%20Abere%2C%20Osun%20State!5e0!3m2!1sen!2sng!4v1689123456789!5m2!1sen!2sng"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
