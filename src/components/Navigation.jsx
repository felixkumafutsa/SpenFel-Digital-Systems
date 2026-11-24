import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Logo from './Logo';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Digital Solutions', href: '#services' },
  { name: 'STEM & Robotics', href: '/stem-robotics-education', isNew: true },
  { name: 'Skills Lab', href: '/training' },
  { name: 'Contact', href: '#contact' },
];

const Navigation = ({ onGetStarted }) => {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMobileMenuOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);
  const resolveHref = (href) => href.startsWith('#') && pathname !== '/' ? `/${href}` : href;

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={reduceMotion ? false : { y: -24 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35 }}
      className={`sds-nav ${isScrolled ? 'sds-nav--scrolled' : ''}`}
    >
      <div className="sds-nav__inner">
        <a className="sds-brand" href={resolveHref('#hero')} onClick={closeMenu} aria-label="SpenFel Digital Systems home">
          <Logo size="sm" />
          <span className="sds-brand__name">SpenFel <b>Digital Systems</b></span>
        </a>

        <div className="sds-nav__desktop">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={resolveHref(link.href)}
              className={`sds-nav__link${pathname === link.href ? ' is-active' : ''}`}
            >
              {link.name}
              {link.isNew && <span className="sds-nav__pill">Academy</span>}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="sds-nav__toggle"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="sds-mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          {isMobileMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="sds-mobile-menu"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            className="sds-nav__mobile"
          >
            <div className="sds-nav__mobile-inner">
              {navLinks.map((link) => (
                <a key={link.name} href={resolveHref(link.href)} className="sds-nav__mobile-link" onClick={closeMenu}>
                  <span>
                    {link.name}
                    {link.isNew && <span className="sds-nav__mobile-pill">Academy</span>}
                  </span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
