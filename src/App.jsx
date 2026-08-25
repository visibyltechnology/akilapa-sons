import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import { ModalProvider } from './context/ModalContext';
import { SubscriptionProvider } from './context/SubscriptionContext';
import './pages/AdminDashboard.css';

// Placeholder for missing pages to prevent build errors
const Placeholder = ({ title }) => (
  <div className="container section-padding text-center">
    <h1>{title}</h1>
    <p>This page is under construction.</p>
  </div>
);

export default function App() {
  return (
    <SubscriptionProvider>
      <ModalProvider>
        <Router>
          <Routes>
            {/* Admin route — outside of AppLayout to have clean full-page layout */}
            <Route path="/admin" element={<AdminDashboard />} />

            {/* All public routes inside AppLayout */}
            <Route path="*" element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/parts" element={<Placeholder title="Car Parts" />} />
                  <Route path="/parts/:category" element={<Placeholder title="Parts Category" />} />
                  <Route path="/services" element={<Placeholder title="Our Services" />} />
                  <Route path="/services/:type" element={<Placeholder title="Service Detail" />} />
                  <Route path="/diagnostics" element={<Placeholder title="Auto Diagnostics" />} />
                  <Route path="/contact" element={<Placeholder title="Contact Us" />} />
                  <Route path="/login" element={<Placeholder title="Log In" />} />
                  <Route path="/signup" element={<Placeholder title="Sign Up" />} />
                  <Route path="*" element={<Placeholder title="404 Not Found" />} />
                </Routes>
              </AppLayout>
            } />
          </Routes>
        </Router>
      </ModalProvider>
    </SubscriptionProvider>
  );
}
