'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

export interface PortfolioItem {
  id: string;
  title: string;
  image_url: string;
  category: string;
  description: string;
  style: string;
  placement: string;
  time_taken: string;
  artist_notes: string;
}

export interface InspirationItem {
  id: string;
  title: string;
  image_url: string;
  status: 'available' | 'adopted';
  style_tag: string;
}

const FALLBACK_PORTFOLIO: PortfolioItem[] = [
  {
    id: 'p1',
    title: 'Realism Lion Portrait',
    image_url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=800&q=80',
    category: 'Realism',
    description: 'Custom upper arm realism piece.',
    style: 'Black & Grey Realism',
    placement: 'Upper Arm / Shoulder',
    time_taken: '6 Hours (Single Session)',
    artist_notes: 'This piece focused on capturing realistic fur texture and reflective light in the eyes. Placed to follow the natural curve of the deltoid muscle.'
  },
  {
    id: 'p2',
    title: 'Neo-Traditional Snake & Dagger',
    image_url: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&w=800&q=80',
    category: 'Color',
    description: 'Vibrant neo-traditional calf piece.',
    style: 'Neo-Traditional / Bold Color',
    placement: 'Outer Calf',
    time_taken: '5 Hours',
    artist_notes: 'Designed with bold outer borders to ensure longevity, filled with a vibrant, modern color palette that pops against the skin.'
  },
  {
    id: 'p3',
    title: 'Geometric Mountain Range',
    image_url: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&w=800&q=80',
    category: 'Fine Line',
    description: 'Delicate fine line mountain landscape.',
    style: 'Fine Line & Dotwork',
    placement: 'Inner Forearm',
    time_taken: '3 Hours',
    artist_notes: 'Utilized ultra-fine single-use needles for the sharp geometric lines and soft stippling/dotwork for the sky shading.'
  },
  {
    id: 'p4',
    title: 'Classic Swallow',
    image_url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=800&q=80',
    category: 'Traditional',
    description: 'Traditional swallow tattoo on collarbone.',
    style: 'American Traditional',
    placement: 'Upper Chest / Collarbone',
    time_taken: '2 Hours',
    artist_notes: 'True to the roots of traditional tattooing: bold lines, solid black shading, and simple, high-impact primary colors.'
  },
  {
    id: 'p5',
    title: 'Floral Tribal Cover-Up',
    image_url: 'https://images.unsplash.com/photo-1560707303-4e980c87f92e?auto=format&fit=crop&w=800&q=80',
    category: 'Cover-ups',
    description: 'Tribal tattoo covered by custom dark floral design.',
    style: 'Custom Dark Blackwork / Cover-Up',
    placement: 'Upper Back',
    time_taken: '8 Hours (Split over 2 sessions)',
    artist_notes: 'Used heavy black leaves to completely mask the old 90s-style tribal work, fading out into soft dotwork to keep the design dynamic.'
  },
  {
    id: 'p6',
    title: 'Sacred Geometry Wrist Cuff',
    image_url: 'https://images.unsplash.com/photo-1590246814883-57c511e76533?auto=format&fit=crop&w=800&q=80',
    category: 'Black & Grey',
    description: 'Dark ornamental sleeve pattern.',
    style: 'Ornamental / Blackwork',
    placement: 'Wrist & Forearm',
    time_taken: '4 Hours',
    artist_notes: 'A clean, symmetrical cuff designed to wrap seamlessly around the wrist. Placement is key here to prevent warping when the wrist rotates.'
  }
];

const FALLBACK_FLASH: InspirationItem[] = [
  {
    id: 'f1',
    title: 'The Ivy Dagger',
    image_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    style_tag: 'Blackwork / Fine Line'
  },
  {
    id: 'f2',
    title: 'Horned Owl Portrait',
    image_url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    status: 'available',
    style_tag: 'Neo-Traditional Color'
  },
  {
    id: 'f3',
    title: 'Lunar Connection',
    image_url: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=800&q=80',
    status: 'adopted',
    style_tag: 'Fine Line / Dotwork'
  },
  {
    id: 'f4',
    title: 'Cascading Koi',
    image_url: 'https://images.unsplash.com/photo-1535262412227-85541e910204?auto=format&fit=crop&w=800&q=80',
    status: 'adopted',
    style_tag: 'Japanese / Traditional'
  }
];

const FILTER_CATEGORIES = [
  'All Work',
  'Black & Grey',
  'Color',
  'Traditional',
  'Fine Line',
  'Realism',
  'Cover-ups'
];

export function PortfolioGallery() {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'flash'>('portfolio');
  const [activeFilter, setActiveFilter] = useState<string>('All Work');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(FALLBACK_PORTFOLIO);
  const [flashItems, setFlashItems] = useState<InspirationItem[]>(FALLBACK_FLASH);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: dbPortfolio, error: pError } = await supabase
          .from('portfolio_items')
          .select('*');
        
        if (!pError && dbPortfolio && dbPortfolio.length > 0) {
          const mappedPortfolio: PortfolioItem[] = dbPortfolio.map((item: any) => {
            const fallbackMatch = FALLBACK_PORTFOLIO.find(p => p.title.toLowerCase() === item.title.toLowerCase());
            return {
              id: item.id,
              title: item.title,
              image_url: item.image_url,
              category: item.category,
              description: item.description || '',
              style: fallbackMatch?.style || item.category,
              placement: fallbackMatch?.placement || 'Custom Placement',
              time_taken: fallbackMatch?.time_taken || 'Varies',
              artist_notes: fallbackMatch?.artist_notes || item.description || 'No custom notes provided for this piece.'
            };
          });
          setPortfolioItems(mappedPortfolio);
        }

        const { data: dbInspiration, error: iError } = await supabase
          .from('inspiration_items')
          .select('*');

        if (!iError && dbInspiration && dbInspiration.length > 0) {
          const mappedInspiration: InspirationItem[] = dbInspiration.map((item: any) => ({
            id: item.id,
            title: item.title,
            image_url: item.image_url,
            status: (item.status === 'available' || item.status === 'adopted') ? item.status : 'available',
            style_tag: item.style_tag || 'Custom Design'
          }));
          setFlashItems(mappedInspiration);
        }
      } catch (e) {
        console.error('Error fetching gallery data:', e);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredPortfolio = activeFilter === 'All Work'
    ? portfolioItems
    : portfolioItems.filter(item => item.category.toLowerCase() === activeFilter.toLowerCase());

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <section id="portfolio-featured" className="bg-[#121212] text-[#F5F5F5] py-20 px-4 sm:px-6 lg:px-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#D4AF37] font-semibold tracking-widest text-xs uppercase block mb-3">
            Creative Showcase
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase font-sans mb-6">
            The Virtual Portfolio
          </h2>
          <p className="text-lg text-[#A0A0A0] leading-relaxed font-sans">
            Browse real, unedited photos of custom tattoos completed by Jake Llewellyn, or explore ready-to-ink custom designs and style concepts.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-[#1E1E1E] p-1.5 rounded-xl border border-zinc-800 shadow-2xl">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'portfolio'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              Completed Custom Work
            </button>
            <button
              onClick={() => setActiveTab('flash')}
              className={`px-6 py-3 rounded-lg text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                activeTab === 'flash'
                  ? 'bg-[#D4AF37] text-black shadow-md'
                  : 'text-[#A0A0A0] hover:text-white'
              }`}
            >
              Available Flash Art
            </button>
          </div>
        </div>

        {/* Render Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            {/* Filter Bar */}
            <div className="flex flex-wrap justify-center gap-2 mb-10 overflow-x-auto pb-4 max-w-4xl mx-auto">
              {FILTER_CATEGORIES.map((category) => {
                const isActive = activeFilter === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 whitespace-nowrap min-h-[44px] ${
                      isActive
                        ? 'bg-[#D4AF37] text-black'
                        : 'bg-[#1E1E1E] text-[#A0A0A0] hover:bg-zinc-800 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Portfolio Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredPortfolio.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    variants={itemVariants}
                    className="group relative bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37] transition-all duration-300 cursor-pointer shadow-xl flex flex-col justify-between"
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative aspect-square overflow-hidden bg-zinc-900">
                      <img
                        src={item.image_url}
                        alt={item.title}
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-[#121212]/90 backdrop-blur-sm text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/30">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 font-sans">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#A0A0A0] line-clamp-2">
                        {item.artist_notes}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">
                        <span>View Project Details</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}

        {/* Render Flash Art Tab */}
        {activeTab === 'flash' && (
          <div>
            {/* Flash Header Explanation */}
            <div className="bg-[#1E1E1E] border-l-4 border-[#D4AF37] p-6 rounded-r-xl max-w-4xl mx-auto mb-12">
              <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-2">About Our Flash Art</h3>
              <p className="text-sm text-[#A0A0A0] leading-relaxed">
                Explore ready-to-ink custom designs and style concepts. "Flash" designs are pre-drawn, original pieces of art by Jake that are ready to be tattooed exactly as shown. Each available flash design is only tattooed once.
              </p>
            </div>

            {/* Flash Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {flashItems.map((flash) => {
                const isAvailable = flash.status === 'available';
                return (
                  <motion.div
                    key={flash.id}
                    variants={itemVariants}
                    className="bg-[#1E1E1E] rounded-xl overflow-hidden border border-zinc-800 hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/5] bg-zinc-900 overflow-hidden">
                      <img
                        src={flash.image_url}
                        alt={flash.title}
                        loading="lazy"
                        className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      />
                      <div className={`absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${
                        isAvailable
                          ? 'bg-emerald-950/90 text-emerald-400 border-emerald-500/30'
                          : 'bg-zinc-900/90 text-[#A0A0A0] border-zinc-700/50'
                      }`}>
                        {flash.status}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#A0A0A0] block mb-1">
                          {flash.style_tag}
                        </span>
                        <h4 className="text-lg font-bold text-white mb-4">{flash.title}</h4>
                      </div>
                      <a
                        href={isAvailable ? `#book` : `#book`}
                        className={`w-full py-3 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-center transition-all duration-300 block ${
                          isAvailable
                            ? 'bg-[#D4AF37] text-black hover:bg-white hover:shadow-lg'
                            : 'bg-zinc-800 text-[#A0A0A0] hover:bg-zinc-700 hover:text-white'
                        }`}
                      >
                        {isAvailable ? 'Claim This Design' : 'Design Something Similar'}
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedItem(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-[#1E1E1E] rounded-2xl overflow-hidden max-w-5xl w-full border border-zinc-800 shadow-2xl grid grid-cols-1 md:grid-cols-2"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left Side: High Res Image */}
              <div className="relative aspect-square md:aspect-auto md:h-[600px] bg-black">
                <img
                  src={selectedItem.image_url}
                  alt={selectedItem.title}
                  className="object-cover w-full h-full"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 left-4 bg-black/75 hover:bg-black text-white p-2.5 rounded-full md:hidden transition-colors border border-zinc-800"
                  aria-label="Close dialog"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Right Side: Metadata & Actions */}
              <div className="p-8 md:p-12 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-[#D4AF37]/20">
                      {selectedItem.category}
                    </span>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="hidden md:block text-[#A0A0A0] hover:text-white transition-colors"
                      aria-label="Close dialog"
                    >
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <h3 className="text-3xl font-black uppercase text-white tracking-tight mb-6 font-sans">
                    {selectedItem.title}
                  </h3>

                  {/* Metadata List */}
                  <div className="space-y-4 mb-8 border-y border-zinc-800 py-6">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-xs text-[#A0A0A0] uppercase tracking-wider font-semibold">Style</span>
                      <span className="text-sm text-white font-medium col-span-2">{selectedItem.style}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-xs text-[#A0A0A0] uppercase tracking-wider font-semibold">Placement</span>
                      <span className="text-sm text-white font-medium col-span-2">{selectedItem.placement}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-xs text-[#A0A0A0] uppercase tracking-wider font-semibold">Time Taken</span>
                      <span className="text-sm text-white font-medium col-span-2">{selectedItem.time_taken}</span>
                    </div>
                  </div>

                  {/* Artist Notes */}
                  <div className="mb-8">
                    <h4 className="text-xs text-[#D4AF37] uppercase tracking-widest font-bold mb-2">Artist Notes</h4>
                    <p className="text-sm text-[#A0A0A0] leading-relaxed italic">
                      "{selectedItem.artist_notes}"
                    </p>
                  </div>
                </div>

                {/* CTA Action */}
                <div>
                  <a
                    href="#book"
                    onClick={() => setSelectedItem(null)}
                    className="w-full bg-[#D4AF37] text-black hover:bg-white text-center py-4 px-6 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 block shadow-lg hover:shadow-xl"
                  >
                    {selectedItem.category === 'Cover-ups' ? 'Inquire About a Cover-Up' : 'Inquire About a Similar Style'}
                  </a>
                  <p className="text-center text-[11px] text-[#A0A0A0] mt-3">
                    Consultations are fully private and held at 6A Gwerthonor Place
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}