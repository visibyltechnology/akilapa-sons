import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, ChevronDown, User, LogIn, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useModal } from '../context/ModalContext';
import { useApp } from '../context/AppContext';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { openCart } = useModal();
  const { cartCount } = useApp();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Car Parts',
      path: '/parts',
      dropdown: [
        { name: 'Engine Oils', path: '/parts/oils' },
        { name: 'Premium Tyres', path: '/parts/tyres' },
        { name: 'Batteries', path: '/parts/batteries' },
        { name: 'Brake Systems', path: '/parts/brakes' },
      ]
    },
    {
      name: 'Services',
      path: '/services',
      dropdown: [
        { name: 'Auto Diagnostics', path: '/diagnostics' },
        { name: 'Wheel Alignment', path: '/services/alignment' },
        { name: 'Fluid Replacement', path: '/services/fluids' },
      ]
    },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled glass-card' : ''}`}>
      <div className="container navbar-container">

        {/* ── Logo + Brand Name ── */}
        <Link to="/" className="navbar-logo">
          <img src="/logo.jpeg" alt="Akilapa & Sons Logo" className="nav-logo-img" />
          <span className="logo-text">
            Akilapa<span className="logo-accent">&</span>Sons
          </span>
        </Link>

        {/* ── Desktop Navigation ── */}
        <nav className="navbar-links desktop-only">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="nav-item-wrapper"
              onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
              onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
            >
              <Link to={link.path} className="nav-link">
                {link.name}
                {link.dropdown && <ChevronDown size={14} className="dropdown-icon" />}
                {location.pathname === link.path && (
                  <motion.div layoutId="activeNavIndicator" className="nav-active-indicator" />
                )}
              </Link>

              <AnimatePresence>
                {link.dropdown && activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.2 }}
                    className="mega-menu glass-card"
                  >
                    {link.dropdown.map(dropLink => (
                      <Link key={dropLink.name} to={dropLink.path} className="dropdown-link">
                        {dropLink.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* ── Actions ── */}
        <div className="navbar-actions">

          {/* Search */}
          <div className="search-container">
            <AnimatePresence>
              {isSearchOpen && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  type="text"
                  placeholder="Search parts..."
                  className="search-input"
                  autoFocus
                />
              )}
            </AnimatePresence>
            <button className="icon-btn" onClick={() => setIsSearchOpen(!isSearchOpen)} aria-label="Search">
              <Search size={22} />
            </button>
          </div>

          {/* Wishlist */}
          <Link to="/wishlist" className="icon-btn" aria-label="Wishlist" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Heart size={22} />
          </Link>

          {/* Cart */}
          <button className="icon-btn cart-btn" aria-label="Cart" onClick={openCart}>
            <ShoppingCart size={22} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Auth Buttons – Desktop only */}
          <div className="auth-btns desktop-only">
            <Link to="/login" className="btn-ghost-sm">
              <LogIn size={16} /> Log In
            </Link>
            <Link to="/signup" className="btn-primary-sm">
              <User size={16} /> Sign Up
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="icon-btn mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-menu glass-card"
          >
            <nav className="mobile-nav-links">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link to={link.path} className="mobile-nav-link">{link.name}</Link>
                  {link.dropdown && (
                    <div className="mobile-dropdown-links">
                      {link.dropdown.map(d => (
                        <Link key={d.name} to={d.path} className="mobile-sub-link">{d.name}</Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Mobile Auth */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.08 }}
                className="mobile-auth-btns"
              >
                <Link to="/login" className="btn-ghost-sm w-full">Log In</Link>
                <Link to="/signup" className="btn-primary-sm w-full">Sign Up</Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
