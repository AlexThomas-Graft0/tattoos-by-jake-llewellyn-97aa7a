'use client';

import React, { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { supabase } from '@/lib/supabaseClient';

interface InspirationItem {
  id: string;
  title: string;
  image_url: string;
  status: 'available' | 'adopted';
  style_tag: string;
  created_at: string;
}

export function WelcomeSection() {
  const [featuredFlash, setFeaturedFlash] = useState<InspirationItem | null>(null);
  const [loadingFlash, setLoadingFlash] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFeaturedFlash() {
      try {
        const { data, error } = await supabase
          .from('inspiration_items')
          .select('*')
          .eq('status', 'available')
          .limit(1);

        if (!error && data && data.length > 0) {
          setFeaturedFlash(data[0] as InspirationItem);
        }
      } catch (err) {
        console.error('Error loading featured flash:', err);
      } finally {
        setLoadingFlash(false);
      }
    }
    fetchFeaturedFlash();
  }, []);

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
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  };

  return (
    <section 
      id="welcome" 
      className="relative bg-[#121212] text-[#F5F5F5] py-20 lg:py-32 overflow-hidden border-b border-zinc-900"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Welcome Split Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24 lg:mb-36"
        >
          {/* Left Column: B&W Artist Image & Optional Live Stamp */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 relative group"
          >
            <div className="absolute -inset-2 rounded-xl bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-[#D4AF37]/10 opacity-70 group-hover:opacity-100 transition duration-500 blur-sm" />
            <div className="relative rounded-lg overflow-hidden border border-zinc-800 bg-[#1E1E1E]">
              <img 
                src="https://images.unsplash.com/photo-1598136490941-30d885361a22?q=80&w=1200&auto=format&fit=crop" 
                alt="Jake Llewellyn working on a custom illustration in the studio" 
                className="w-full h-[450px] lg:h-[550px] object-cover grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent opacity-60" />
              
              {/* Location Tag Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#1E1E1E]/95 backdrop-blur border border-zinc-800 px-4 py-3 rounded shadow-xl flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A0A0A0] uppercase tracking-wider font-mono">Clinical Studio</p>
                  <p className="text-sm font-bold text-[#F5F5F5] tracking-wide">6A Gwerthonor Place, CF81 8JQ</p>
                </div>
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Custom Philosophy Copy */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-sm uppercase tracking-widest text-[#D4AF37] font-semibold">Artist & Studio Standards</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-8 uppercase font-sans leading-none">
              A Higher Standard of <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">
                Body Art
              </span> in South Wales
            </h2>

            <div className="space-y-6 text-[#A0A0A0] text-lg leading-relaxed font-sans">
              <p>
                Getting a tattoo is a personal journey. Whether you are planning your very first piece or adding another project to a full sleeve, you deserve a space where your ideas are respected and executed with clinical precision.
              </p>
              <p>
                At Tattoos by Jake Llewellyn, I specialize in turning your concepts into custom, long-lasting body art. From fine-line work and bold traditional designs to complex cover-ups, I work closely with you at every stage of the process.
              </p>
              <p>
                I operate a fully licensed, private studio in Gilfach Bargoed, prioritizing absolute hygiene, safety, and creative collaboration. Your skin is a canvas, and we will treat it with the care and skill it deserves.
              </p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <a 
                href="#about"
                className="px-8 py-4 bg-transparent border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#121212] transition-all duration-300 rounded font-bold uppercase tracking-wider text-sm inline-flex items-center group shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#121212] min-h-[44px]"
              >
                Read More About the Studio
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a 
                href="#book"
                className="px-8 py-4 bg-[#1E1E1E] border border-zinc-800 text-[#F5F5F5] hover:border-zinc-700 transition-all duration-300 rounded font-bold uppercase tracking-wider text-sm min-h-[44px]"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Studio Hygiene & Technical Standards Section */}
        <div className="border-t border-zinc-900 pt-20 lg:pt-28">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-sm uppercase tracking-widest text-[#D4AF37] font-semibold">Strict Clinical Protocol</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F5] uppercase mb-4">
              Clinical Standards, Comfortable Space
            </h3>
            <p className="text-[#A0A0A0] text-lg">
              My studio at 6A Gwerthonor Place is operated under strict professional, hygienic, and legal standards. Your safety is my highest priority.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Standard 1 */}
            <div className="bg-[#1E1E1E] border border-zinc-800 p-8 rounded-lg hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded bg-amber-500/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                  {/* Medical Sterilization Icon */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#F5F5F5] mb-3 uppercase tracking-wide">100% Sterile Equipment</h4>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  I enforce a strict, single-use needle and cartridge policy. All disposable grips and tools are opened in front of you prior to the session and disposed of immediately afterward in medical sharps containers.
                </p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mt-6 block">Premium Safety</span>
            </div>

            {/* Standard 2 */}
            <div className="bg-[#1E1E1E] border border-zinc-800 p-8 rounded-lg hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded bg-amber-500/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                  {/* License Icon */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#F5F5F5] mb-3 uppercase tracking-wide">Fully Registered Studio</h4>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  Both the studio and I are fully licensed, inspected, and approved by the local Caerphilly County Borough environmental health authorities. We adhere strictly to all Welsh safety regulations.
                </p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mt-6 block">Certified</span>
            </div>

            {/* Standard 3 */}
            <div className="bg-[#1E1E1E] border border-zinc-800 p-8 rounded-lg hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded bg-amber-500/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                  {/* Vegan Friendly Icon */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#F5F5F5] mb-3 uppercase tracking-wide">Premium Materials</h4>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  I use only industry-leading, highly saturated, vegan-friendly inks. These pigments are free from animal products, highly stable, and engineered to heal vibrantly and resist fading.
                </p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mt-6 block">Vegan Inks</span>
            </div>

            {/* Standard 4 */}
            <div className="bg-[#1E1E1E] border border-zinc-800 p-8 rounded-lg hover:border-[#D4AF37]/50 transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded bg-amber-500/10 border border-[#D4AF37]/20 flex items-center justify-center mb-6 text-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-colors">
                  {/* Private Studio Icon */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-[#F5F5F5] mb-3 uppercase tracking-wide">Private Session Environment</h4>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">
                  Unlike busy, loud street shops with constant foot traffic, my studio provides a private, calm, and relaxed environment. This ensures you feel safe, comfortable, and receive my undivided artistic focus.
                </p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mt-6 block">1-on-1 Focus</span>
            </div>
          </div>
        </div>

        {/* Interactive Element: Live Available Flash Spotlight from database */}
        {!loadingFlash && featuredFlash && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-zinc-950 via-[#1E1E1E] to-zinc-950 border border-[#D4AF37]/30 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-zinc-800 flex-shrink-0 bg-black">
                <img 
                  src={featuredFlash.image_url} 
                  alt={featuredFlash.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Currently Available Concept
                </div>
                <h4 className="text-lg font-bold text-[#F5F5F5] tracking-wide uppercase">{featuredFlash.title}</h4>
                <p className="text-xs text-[#A0A0A0] mt-0.5">Style Concept: {featuredFlash.style_tag || 'Custom Design'}</p>
              </div>
            </div>
            
            <a 
              href={`#book?flash_id=${featuredFlash.id}`}
              className="w-full md:w-auto text-center px-6 py-3 bg-[#D4AF37] hover:bg-amber-400 text-[#121212] font-extrabold text-xs uppercase tracking-widest rounded transition-colors duration-300 shadow-md min-h-[44px] flex items-center justify-center"
            >
              Inquire About This Concept
            </a>
          </motion.div>
        )}

      </div>
    </section>
  );
}