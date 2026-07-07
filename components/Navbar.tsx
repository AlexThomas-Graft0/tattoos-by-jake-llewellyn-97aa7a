'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Flash & Inspiration', href: '#inspiration' },
  { label: 'Aftercare', href: '#aftercare' },
  { label: 'About', href: '#about' },
  { label: 'Location', href: '#contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const topBarVariants: Variants = {
    visible: { height: 'auto', opacity: 1, transition: { duration: 0.2 } },
    hidden: { height: 0, opacity: 0, overflow: 'hidden', transition: { duration: 0.2 } }
  };

  const mobileMenuVariants: Variants = {
    closed: { 
      opacity: 0, 
      height: 0,
      transition: { duration: 0.25, ease: 'easeInOut' }
    },
    open: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3, ease: 'easeInOut' }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-colors duration-300">
      {/* Quick Info Bar - Collapses on Scroll */}
      <motion.div 
        variants={topBarVariants}
        animate={scrolled ? 'hidden' : 'visible'}
        className="w-full bg-[#1E1E1E] border-b border-[#D4AF37]/30 text-[11px] sm:text-xs text-[#A0A0A0] py-2 px-4 md:px-8 hidden md:block"
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              6A Gwerthonor Place, Gilfach Bargoed, CF81 8JQ
            </span>
            <span className="text-[#D4AF37]/40">|</span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-[#D4AF37]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tue – Sat: 10:00 AM – 6:00 PM
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="mailto:info@jakellewellyntattoos.co.uk" className="hover:text-[#D4AF37] transition-colors">
              info@jakellewellyntattoos.co.uk
            </a>
            <span className="text-[#D4AF37]/40">|</span>
            <a href="tel:07494568281" className="hover:text-[#D4AF37] transition-colors font-medium text-[#F5F5F5]">
              07494 568 281
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-[#121212]/95 backdrop-blur-md py-3 shadow-lg border-b border-[#1E1E1E]' 
          : 'bg-[#121212]/80 backdrop-blur-sm py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center">
          
          {/* Brand Logo */}
          <a 
            href="#hero" 
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] rounded-md p-1"
            aria-label="Tattoos by Jake Llewellyn Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-[#D4AF37]/40 bg-[#1E1E1E] group-hover:border-[#D4AF37] transition-colors duration-300">
              {/* Abstract minimalist tattoo needle / geometric icon */}
              <svg className="w-6 h-6 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v14M12 17l-3 4h6l-3-4zM8 7h8" />
              </svg>
              <div className="absolute inset-0 rounded-lg bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="flex flex-col">
              <span className="text-[#F5F5F5] font-bold tracking-wider text-base md:text-lg leading-tight group-hover:text-[#D4AF37] transition-colors duration-300 font-mono">
                JAKE LLEWELLYN
              </span>
              <span className="text-[9px] text-[#A0A0A0] tracking-[0.2em] uppercase leading-none">
                Bespoke Tattoo Studio
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[#A0A0A0] hover:text-[#F5F5F5] transition-colors relative py-2 group focus:outline-none focus:text-[#F5F5F5]"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Action / Booking Button */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="#book"
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#121212] bg-[#D4AF37] hover:bg-[#c4a030] transition-colors duration-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#121212]"
            >
              Book Consultation
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1E1E1E] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="lg:hidden border-t border-[#1E1E1E] mt-3 bg-[#121212]"
            >
              <div className="px-4 pt-2 pb-6 space-y-1 sm:px-6">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-3 rounded-md text-base font-medium text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-[#1E1E1E] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                
                {/* Mobile top-bar duplicate for accessibility */}
                <div className="pt-4 mt-4 border-t border-[#1E1E1E] text-xs text-[#A0A0A0] space-y-2 px-3">
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    6A Gwerthonor Place, Gilfach Bargoed
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    Tue – Sat: 10am – 6pm
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    07494 568 281
                  </p>
                </div>

                <div className="mt-6 px-3">
                  <a
                    href="#book"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-[#121212] bg-[#D4AF37] hover:bg-[#c4a030] transition-colors duration-300 rounded-md"
                  >
                    Book Consultation
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}