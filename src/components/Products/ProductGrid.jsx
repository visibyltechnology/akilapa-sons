import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import './ProductGrid.css';

const products = [
  { id: 1, name: 'Mobil 1 Full Synthetic 5W-30', category: 'Engine Oil', price: '₦12,500', spec: 'Viscosity: 5W-30', img: 'https://images.unsplash.com/photo-1635787612140-5291f3a2d5de?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Michelin Pilot Sport 4', category: 'Tyres', price: '₦85,000', spec: 'Rim Size: 18"', img: 'https://images.unsplash.com/photo-1590401826012-70b86a34791a?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Bosch Premium Battery', category: 'Batteries', price: '₦45,000', spec: '12V 75Ah', img: 'https://images.unsplash.com/photo-1620387556779-c5cce42f9b8c?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Brembo Brake Pads', category: 'Brakes', price: '₦22,000', spec: 'Ceramic', img: 'https://images.unsplash.com/photo-1616790588674-6b2a0c4f83fb?auto=format&fit=crop&q=80&w=400' },
];

function ProductCard({ product }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const rY = ((mouseX / width) - 0.5) * 20; // max 20deg
    const rX = ((mouseY / height) - 0.5) * -20;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card product-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
    >
      <div className="product-image-container">
        <img src={product.img} alt={product.name} className="product-image" />
        <div className="product-spec-overlay">
          <span>{product.spec}</span>
        </div>
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-bottom">
          <span className="product-price">{product.price}</span>
          <button className="add-to-cart-btn" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProductGrid() {
  return (
    <section className="section-padding product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Premium <span className="text-primary">Parts</span></h2>
          <p className="section-subtitle">Guaranteed original parts for ultimate performance.</p>
        </div>
        
        <div className="grid grid-cols-4 gap-6 product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <button className="btn-outline">View All Parts</button>
        </div>
      </div>
    </section>
  );
}
