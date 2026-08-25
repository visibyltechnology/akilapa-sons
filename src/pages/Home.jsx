import React, { useState } from 'react';
import BrandPreloader from '../components/Home/BrandPreloader';
import Hero from '../components/Home/Hero';
import ProductGrid from '../components/Products/ProductGrid';
import ServiceTabs from '../components/Services/ServiceTabs';
import VisualDiagnosticTool from '../components/UX/VisualDiagnosticTool';

export default function Home() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <div className="home-page">
      {!preloaderComplete && (
        <BrandPreloader onComplete={() => setPreloaderComplete(true)} />
      )}
      
      <Hero />
      <ServiceTabs />
      <VisualDiagnosticTool />
      <ProductGrid />
      
    </div>
  );
}
