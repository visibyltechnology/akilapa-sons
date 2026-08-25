import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getProducts } from '../../utils/productService';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

export const ScrollableProductSlider = ({ products }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -432 : 432;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="slider-container">
      <button className="slider-btn left" onClick={() => scroll('left')} aria-label="Scroll left">
        <ChevronLeft size={24} color="#000" />
      </button>
      
      <div className="scrollable-2row" ref={scrollRef}>
        {products?.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <button className="slider-btn right" onClick={() => scroll('right')} aria-label="Scroll right">
        <ChevronRight size={24} color="#000" />
      </button>
    </div>
  );
};

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const dbProducts = await getProducts();
      setProducts(dbProducts || []);
    };
    fetchProducts();
  }, []);

  return (
    <section className="section-padding product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Premium <span className="text-primary">Parts</span></h2>
          <p className="section-subtitle">Guaranteed original parts for ultimate performance.</p>
        </div>
        
        <ScrollableProductSlider products={products} />
        
        <div className="text-center" style={{ marginTop: '3rem' }}>
          <Link to="/shop" className="btn-outline">View All Parts</Link>
        </div>
      </div>
    </section>
  );
}
