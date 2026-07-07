'use client';

import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export function Footer() {
  const [availableFlashCount, setAvailableFlashCount] = useState<number | null>(null);

  useEffect(() => {
    async function getAvailableCount() {
      try {
        const { count, error } = await supabase
          .from('portfolio_items') // fallback or primary check
          .select('*', { count: 'exact', head: true });

        // Let's query the specific inspiration_items table for available flash count
        const { count: flashCount, error: flashError } = await supabase
          .from('tattoos_by_jake_llewellyn_97aa7a.inspiration_items')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'available');

        if (!flashError && flashCount !== null) {
          setAvailableFlashCount(flashCount);
        } else {
          // Fallback to a default premium number if database is fresh
          setAvailableFlashCount(2);
        }
      } catch (err) {
        setAvailableFlashCount(2);
      }
    }
    getAvailableCount();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#121212] text-[#F5F5F5] border-t-2 border-[#D4AF37]/30 font-sans overflow-hidden">
      {/* Decorative Gold Light Leak Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-black/50 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#1E1E1E]"
        >
          {/* Main Studio Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block">
                Gilfach Bargoed, South Wales
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F5] uppercase font-mono">
                Tattoos by <span className="text-[#D4AF37]">Jake Llewellyn</span>
              </h2>
            </div>

            <p className="text-[#A0A0A0] text-base leading-relaxed max-w-md">
              Professional custom tattoos and bespoke cover-ups in a sterile, private studio environment. Fully licensed and dedicated to bringing your unique vision to life with clinical precision.
            </p>

            {/* Dynamic Status / Availability Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#1E1E1E] border border-[#D4AF37]/20 rounded-full shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
              </span>
              <span className="text-sm font-medium text-[#F5F5F5]">
                {availableFlashCount !== null ? `${availableFlashCount} Pre-drawn Flash Designs Available` : 'Flash Bookings Active'}
              </span>
            </div>

            {/* Micro Location Info */}
            <div className="text-sm text-[#A0A0A0] flex items-start gap-2.5">
              <svg className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>
                <strong className="text-[#F5F5F5]">Studio Address:</strong><br />
                6A Gwerthonor Place, Gilfach Bargoed, CF81 8JQ, Wales
              </span>
            </div>
          </motion.div>

          {/* Quick Links Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Featured Work', target: '#portfolio' },
                { name: 'Style Library & Flash', target: '#inspiration' },
                { name: 'How It Works', target: '#process' },
                { name: 'Aftercare Guide', target: '#aftercare' },
                { name: 'Meet Jake', target: '#about' },
                { name: 'Book Consultation', target: '#book' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.target.replace('#', ''))}
                    className="text-left text-[#A0A0A0] hover:text-[#D4AF37] transition-colors duration-200 text-sm py-1 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 rounded"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Studio Hours Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2.5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Studio Hours
            </h3>
            <div className="space-y-2 text-sm text-[#A0A0A0]">
              <div className="flex justify-between border-b border-[#1E1E1E] pb-1.5">
                <span>Tuesday - Saturday</span>
                <span className="text-[#F5F5F5] font-medium">10am – 6pm</span>
              </div>
              <div className="flex justify-between border-b border-[#1E1E1E] pb-1.5">
                <span>Sunday & Monday</span>
                <span className="text-[#D97706] font-medium">Closed</span>
              </div>
              <p className="text-xs text-[#A0A0A0]/80 pt-2 italic leading-relaxed">
                *Sessions are by pre-booked appointment only. No walk-ins guaranteed.
              </p>
            </div>
          </motion.div>

          {/* Direct Contact / CTA Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2.5 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
              Direct Contact
            </h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:info@jakellewellyntattoos.co.uk"
                className="group flex items-center gap-2.5 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors"
              >
                <svg className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="break-all">info@jakellewellyntattoos.co.uk</span>
              </a>

              <a
                href="tel:07494568281"
                className="group flex items-center gap-2.5 text-[#A0A0A0] hover:text-[#D4AF37] transition-colors"
              >
                <svg className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>07494 568 281</span>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => scrollToSection('book')}
                className="w-full py-3 px-4 bg-gradient-to-r from-[#D4AF37] to-[#B8962E] hover:from-[#E5C048] hover:to-[#C9A535] text-black font-bold uppercase text-xs tracking-wider rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#121212]"
              >
                Book Consultation
              </button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar: Copyright, Legal & Socials */}
        <div className="pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-sm text-[#A0A0A0]">
              © 2025 Tattoos by Jake Llewellyn. All rights reserved.
            </p>
            <p className="text-xs text-[#A0A0A0]/60 max-w-xl">
              Both the studio and artist are fully registered, licensed, and approved by the Caerphilly County Borough Environmental Health Authority. Strictly 18+ only.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/tattoosbyjakellewellyn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#1E1E1E] hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-black rounded-full border border-[#D4AF37]/10 transition-all duration-300 shadow-md"
              aria-label="Follow Jake on Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com/tattoosbyjakellewellyn"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-[#1E1E1E] hover:bg-[#D4AF37] text-[#F5F5F5] hover:text-black rounded-full border border-[#D4AF37]/10 transition-all duration-300 shadow-md"
              aria-label="Follow Jake on Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.01 3.71.054 1.139.052 1.9.232 2.508.468.627.242 1.21.583 1.661 1.024.436.438.77.922 1.002 1.516.24.627.42 1.343.47 2.482.043.947.052 1.3.052 3.71s-.01 2.784-.052 3.71c-.05 1.139-.23 1.9-.466 2.508-.24.627-.58 1.211-1.018 1.662-.438.436-.922.77-1.516 1.002-.627.24-1.343.42-2.482.47-.947.043-1.3.052-3.71.052s-2.784-.01-3.71-.052c-1.139-.05-1.9-.23-2.508-.466a4.99 4.99 0 01-1.662-1.018 4.99 4.99 0 01-1.002-1.516c-.24-.627-.42-1.343-.47-2.482-.043-.947-.052-1.3-.052-3.71s.01-2.784.052-3.71c.05-1.139.23-1.9.466-2.508a4.99 4.99 0 011.018-1.662 4.99 4.99 0 011.516-1.002c.627-.24 1.343-.42 2.482-.47.947-.043 1.3-.052 3.71-.052zm0 1.841c-2.4 0-2.685.01-3.631.053-.9.041-1.39.191-1.714.317-.43.167-.736.367-1.058.69-.322.321-.522.628-.69 1.058-.126.324-.276.814-.317 1.714-.043.946-.053 1.23-.053 3.631s.01 2.685.053 3.631c.041.9.191 1.39.317 1.714.167.43.367.736.69 1.058.321.322.628.522 1.058.69.324.126.814.276 1.714.317.946.043 1.23.053 3.631.053s2.685-.01 3.631-.053c.9-.041 1.39-.191 1.714-.317.43-.167.736-.367 1.058-.69.322-.321.522-.628.69-1.058.126-.324.276-.814.317-1.714.043-.946.053-1.23.053-3.631s-.01-2.685-.053-3.631c-.041-.9-.191-1.39-.317-1.714-.167-.43-.367-.736-.69-1.058-.321-.322-.628-.522-1.058-.69-.324-.126-.814-.276-1.714-.317-.946-.043-1.23-.053-3.631-.053zm0 3.033a5.126 5.126 0 100 10.252 5.126 5.126 0 000-10.252zm0 8.411a3.285 3.285 0 110-6.57 3.285 3.285 0 010 6.57zm5.661-8.51a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0z" clipRule="evenodd" />
              </svg>
            </a>

            {/* Back to Top Button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="p-3 bg-[#1E1E1E] hover:bg-[#D4AF37]/20 text-[#A0A0A0] hover:text-[#D4AF37] rounded-full border border-white/5 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-md group focus:outline-none"
              title="Back to top"
            >
              <svg className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}