'use client';

import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface PortfolioItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description: string | null;
}

export function HeroSection() {
  const [recentItems, setRecentItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentPortfolio() {
      try {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('id, title, image_url, category, description')
          .order('created_at', { ascending: false })
          .limit(3);

        if (!error && data) {
          setRecentItems(data);
        }
      } catch (err) {
        console.error('Error fetching portfolio items:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecentPortfolio();
  }, []);

  // Framer Motion Variants with proper explicit typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const infoBarVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay: 0.6,
      },
    },
  };

  // Fallback high-res portfolio images if database is empty
  const fallbackItems: PortfolioItem[] = [
    {
      id: 'fallback-1',
      title: 'Black & Grey Realism',
      image_url: 'https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?q=80&w=600&auto=format&fit=crop',
      category: 'Realism',
      description: 'Custom sleeve work'
    },
    {
      id: 'fallback-2',
      title: 'Traditional Rose',
      image_url: 'https://images.unsplash.com/photo-1560707303-4e980c87f846?q=80&w=600&auto=format&fit=crop',
      category: 'Traditional',
      description: 'Bold lines, classic look'
    },
    {
      id: 'fallback-3',
      title: 'Fine Line Floral',
      image_url: 'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=600&auto=format&fit=crop',
      category: 'Fine Line',
      description: 'Delicate botanical details'
    }
  ];

  const displayItems = recentItems.length > 0 ? recentItems : fallbackItems;

  return (
    <section className="relative w-full bg-[#121212] text-[#F5F5F5] overflow-hidden flex flex-col justify-between min-h-screen">
      {/* Background Studio Image with Premium Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1598135753163-6167c1a1ad65?q=80&w=2000&auto=format&fit=crop"
          alt="Tattoos by Jake Llewellyn Studio Space"
          className="w-full h-full object-cover object-center scale-105 filter brightness-95"
        />
        {/* 65% Black Overlay + Custom Gradients for Depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-16 md:py-40 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          
          {/* Left Column: Text Content & Primary Callouts */}
          <motion.div 
            className="lg:col-span-7 text-center md:text-left flex flex-col justify-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Minimalist Premium Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center justify-center md:justify-start space-x-2">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Bespoke Body Art • Gilfach Bargoed
              </span>
            </motion.div>

            {/* Verbatim Headline */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F5F5F5] leading-tight uppercase font-sans"
            >
              Your Vision, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#f3d06c] to-[#D4AF37]">
                Expertly Inked.
              </span>
            </motion.h1>

            {/* Verbatim Subheadline */}
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-[#A0A0A0] max-w-2xl leading-relaxed font-light"
            >
              Professional custom tattoos and bespoke cover-ups in a clean, welcoming, and sterile studio environment in Gilfach Bargoed. Let’s bring your ideas to life.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4"
            >
              <a
                href="#book"
                className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-wider text-sm rounded-none hover:bg-[#F5F5F5] transition-all duration-300 shadow-lg shadow-[#D4AF37]/10 hover:shadow-[#F5F5F5]/10 text-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              >
                Book Your Consultation
              </a>
              <a
                href="#portfolio-featured"
                className="w-full sm:w-auto px-8 py-4 border border-[#D4AF37]/50 text-[#F5F5F5] font-semibold uppercase tracking-wider text-sm rounded-none hover:border-[#D4AF37] hover:bg-white/5 transition-all duration-300 text-center focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:outline-none"
              >
                View the Portfolio
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Live Dynamic Portfolio/Status Indicator */}
          <motion.div 
            className="lg:col-span-5 hidden lg:flex flex-col space-y-6 justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 60, damping: 20, delay: 0.4 }}
          >
            <div className="bg-[#1E1E1E]/95 border border-[#D4AF37]/20 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 blur-2xl rounded-full" />
              
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold">
                  Recently Inked Work
                </h3>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {loading ? (
                <div className="space-y-4 animate-pulse">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="h-16 bg-white/5 border border-white/5" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {displayItems.map((item) => (
                    <div 
                      key={item.id} 
                      className="group flex items-center space-x-4 p-2 bg-[#121212]/40 hover:bg-[#121212] border border-transparent hover:border-[#D4AF37]/30 transition-all duration-300"
                    >
                      <div className="h-14 w-14 flex-shrink-0 overflow-hidden border border-[#D4AF37]/10 group-hover:border-[#D4AF37]/60 transition-colors">
                        <img 
                          src={item.image_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-semibold text-[#F5F5F5] truncate group-hover:text-[#D4AF37] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-[#A0A0A0] truncate">
                          {item.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] px-2 py-1 bg-[#D4AF37]/10 font-bold">
                          View
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#A0A0A0]">
                <span>Private Studio Environment</span>
                <span className="text-[#D4AF37]">100% Sterile</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Quick Info Bar - Verbatim details and structured exactly to Design Blueprint */}
      <motion.div 
        className="relative z-10 w-full bg-[#1E1E1E] border-t border-b border-[#D4AF37]/30"
        variants={infoBarVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20">
            
            {/* Location Block */}
            <div className="flex items-start space-x-4 pb-4 md:pb-0 md:px-4">
              <div className="flex-shrink-0 p-2 bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37] mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold">Studio Location</p>
                <p className="text-sm font-medium text-[#F5F5F5] mt-1 leading-relaxed">
                  6A Gwerthonor Place, <br />
                  Gilfach Bargoed, CF81 8JQ
                </p>
              </div>
            </div>

            {/* Opening Hours Block */}
            <div className="flex items-start space-x-4 pt-4 md:pt-0 md:px-6">
              <div className="flex-shrink-0 p-2 bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37] mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold">Opening Hours</p>
                <p className="text-sm font-medium text-[#F5F5F5] mt-1 leading-relaxed">
                  Tuesday – Saturday: 10:00 AM – 6:00 PM <br />
                  <span className="text-[#A0A0A0]/80">Sun & Mon: Closed</span>
                </p>
              </div>
            </div>

            {/* Direct Contact Block */}
            <div className="flex items-start space-x-4 pt-4 md:pt-0 md:px-6">
              <div className="flex-shrink-0 p-2 bg-[#121212] border border-[#D4AF37]/30 text-[#D4AF37] mt-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold">Direct Contact</p>
                <p className="text-sm font-medium text-[#F5F5F5] mt-1 leading-relaxed">
                  info@jakellewellyntattoos.co.uk <br />
                  <span className="text-[#D4AF37]">07494 568 281</span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}