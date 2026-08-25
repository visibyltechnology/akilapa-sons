import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart } from 'lucide-react';

/**
 * Shared ProductCard used by Shop.jsx, Home.jsx, and any other page.
 * Compatible with the old Home.jsx import: { ProductCard } from './Home'
 */
export function ProductCard({ product }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rY = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const rX = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const price = product?.price ?? product?.discountedPrice ?? 0;
  const oldPrice = product?.originalPrice;
  const name = product?.name ?? 'Product';
  const brand = product?.brand ?? product?.category ?? '';
  const image = product?.images?.[0] ?? product?.img ?? 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=400';
  const id = product?.id ?? '#';

  return (
    <motion.div
      ref={cardRef}
      className="glass-card product-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
    >
      <Link to={`/product/${id}`}>
        <div className="product-image-container">
          <img src={image} alt={name} className="product-image" />
        </div>
      </Link>
      <div className="product-info">
        {brand && <span className="product-category">{brand}</span>}
        <Link to={`/product/${id}`}>
          <h3 className="product-name">{name}</h3>
        </Link>
        <div className="product-bottom">
          <div>
            <span className="product-price">₦{Number(price).toLocaleString()}</span>
            {oldPrice && (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginLeft: '0.4rem' }}>
                ₦{Number(oldPrice).toLocaleString()}
              </span>
            )}
          </div>
          <button className="add-to-cart-btn" aria-label="Add to cart">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ProductCard;
