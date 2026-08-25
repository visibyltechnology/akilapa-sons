import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, MessageCircle } from 'lucide-react';
import './WhatsAppCartDrawer.css';

// Mock Cart Data for Demonstration
const mockCart = [
  { id: 1, name: 'Mobil 1 Full Synthetic 5W-30', price: 12500, qty: 2 },
  { id: 4, name: 'Brembo Brake Pads', price: 22000, qty: 1 }
];

export default function WhatsAppCartDrawer({ isOpen, onClose }) {
  const total = mockCart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleWhatsAppCheckout = () => {
    const text = mockCart.map(item => `${item.qty}x ${item.name} (₦${item.price.toLocaleString()})`).join('\n');
    const message = `Hello Akilapa & Sons, I want to order the following parts:\n\n${text}\n\nTotal: ₦${total.toLocaleString()}`;
    const url = `https://wa.me/2348035647729?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="cart-drawer glass-card"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="drawer-header">
              <h2>Your Cart</h2>
              <button className="close-btn" onClick={onClose} aria-label="Close Cart">
                <X size={24} />
              </button>
            </div>

            <div className="drawer-items">
              {mockCart.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <span className="item-price">₦{item.price.toLocaleString()} x {item.qty}</span>
                  </div>
                  <button className="remove-btn" aria-label="Remove Item">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span className="text-primary font-bold">₦{total.toLocaleString()}</span>
              </div>
              <button className="btn-primary whatsapp-btn" onClick={handleWhatsAppCheckout}>
                <MessageCircle size={20} />
                Checkout via WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
