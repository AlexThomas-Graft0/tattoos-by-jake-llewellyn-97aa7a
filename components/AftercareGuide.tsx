'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  ChevronDown, 
  Droplet, 
  HeartHandshake, 
  Flame, 
  ShieldCheck,
  CalendarDays,
  Info
} from 'lucide-react';

interface Phase {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  tips: string[];
}

export function AftercareGuide() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-1');

  const phases: Phase[] = [
    {
      id: 'phase-1',
      number: '01',
      title: 'The First 24 Hours',
      subtitle: 'The Initial Wrap & First Cleanse',
      duration: 'Day 1',
      tips: [
        'Leave the Wrap On: Keep the protective wrap applied at the studio on for at least 2 to 4 hours (or overnight if advised). This protects the raw skin from airborne bacteria and clothing friction.',
        'The First Wash: Wash your hands thoroughly with antibacterial soap before touching your tattoo. Gently remove the wrap. Wash the tattoo using warm water and your bare hands (do not use a washcloth or sponge). Gently clean off any dried blood, plasma, and excess ink.',
        'Pat Dry: Pat the area completely dry with a fresh, clean paper towel. Do not rub. Let it air dry for 10 minutes.',
        'First Lotion Application: Apply an extremely thin layer of recommended aftercare ointment. The tattoo should look slightly damp, not greasy or wet. If it looks shiny, dab off the excess with a clean paper towel.'
      ]
    },
    {
      id: 'phase-2',
      number: '02',
      title: 'Days 2 to 4',
      subtitle: 'The Peeling Stage',
      duration: 'Days 2–4',
      tips: [
        'Wash Twice Daily: Wash the tattoo gently morning and night with warm water and unscented, antibacterial soap.',
        'Moisturize Thinly: Apply a tiny amount of lotion 2 to 3 times a day. Keeping the skin moisturized prevents heavy scabbing.',
        'Wear Loose Clothing: Tight waistbands, straps, or stiff fabrics will rub against the healing skin, pulling out ink and causing raw spots. Wear soft, loose clothing over the area.'
      ]
    },
    {
      id: 'phase-3',
      number: '03',
      title: 'Days 5 to 14',
      subtitle: 'The Itching Stage',
      duration: 'Days 5–14',
      tips: [
        'Do Not Scratch or Pick: Your tattoo will begin to flake, peel, and itch, similar to a mild sunburn. This is completely normal. Do not scratch, pick, or peel the flaking skin. Pulling off dry flakes prematurely will pull ink out of the deep layers of your skin, leaving blank spots.',
        'Relieve the Itch: If the itching becomes intense, gently slap the tattoo with clean hands, or apply a small amount of moisturizer to soothe the skin.'
      ]
    },
    {
      id: 'phase-4',
      number: '04',
      title: 'Day 15 and Beyond',
      subtitle: 'Long-Term Preservation',
      duration: 'Days 15+',
      tips: [
        'The Skin is Still Healing: Though the surface looks healed, the deeper layers of skin take up to 6 weeks to fully rebuild. Continue applying standard, unscented body moisturizer daily.',
        'Sun Protection is Key: UV rays from the sun break down tattoo ink over time, causing lines to blur and colors to fade. Once fully healed, always apply a high-factor sunblock (SPF 50+) directly to your tattoo when spending time outdoors.'
      ]
    }
  ];

  const dos = [
    'Wash your hands thoroughly with antibacterial soap before touching your healing tattoo.',
    'Use clean paper towels to pat the area dry instead of shared bathroom towels.',
    'Wear loose, breathable cotton clothing to prevent friction and sweat buildup.',
    'Contact Jake immediately if you have any questions or notice unusual redness.'
  ];

  const donts = [
    'Don\'t pick, scratch, or peel any flaking skin or scabs.',
    'Don\'t submerge your tattoo in water. No baths, swimming pools, hot tubs, lakes, or sea swimming for at least 3 weeks.',
    'Don\'t expose the healing tattoo to direct, bright sunlight or tanning beds.',
    'Don\'t apply thick, heavy petroleum jelly (like Vaseline). This suffocates the skin and traps bacteria inside.',
    'Don\'t let pets sleep near or rub against your healing tattoo.'
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section className="relative min-h-screen bg-[#121212] text-[#F5F5F5] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-red-900/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-3">
            Preserve Your Art
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 font-serif">
            Tattoo Aftercare Instructions
          </h1>
          <p className="text-[#A0A0A0] text-lg leading-relaxed">
            The work in the studio is only half the journey. How you care for your new tattoo over the next few weeks directly determines how bright, sharp, and clean it will look for years to come.
          </p>
        </div>

        {/* 50/50 Warning Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden bg-gradient-to-r from-[#1E1E1E] to-[#2A2315] border border-[#D4AF37]/30 rounded-2xl p-6 sm:p-10 mb-16 shadow-2xl"
        >
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <ShieldAlert className="w-64 h-64 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] shrink-0 mt-1 md:mt-0">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F5F5] mb-2 flex items-center gap-2">
                  Critical Healing Period <span className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full font-mono">50% Rule</span>
                </h3>
                <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed max-w-2xl">
                  Your new tattoo is an open wound—treat it with clean hands and absolute care. Aftercare constitutes <strong className="text-[#D4AF37] font-semibold">50% of the final result</strong>. Neglecting these rules can lead to fading, ink loss, or infection.
                </p>
              </div>
            </div>
            <a 
              href="#timeline" 
              className="w-full md:w-auto text-center shrink-0 bg-[#D4AF37] hover:bg-[#bda030] text-[#121212] font-bold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-[#D4AF37]/10 text-sm tracking-wider uppercase"
            >
              View Healing Timeline
            </a>
          </div>
        </motion.div>

        {/* Phase-by-Phase Timeline & Visual Section */}
        <div id="timeline" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Interactive Timeline Accordion */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <CalendarDays className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="text-2xl font-bold tracking-tight">Phase-by-Phase Timeline</h2>
            </div>

            <div className="space-y-3">
              {phases.map((phase) => {
                const isExpanded = expandedPhase === phase.id;
                return (
                  <div 
                    key={phase.id} 
                    className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                      isExpanded 
                        ? 'bg-[#1E1E1E] border-[#D4AF37]/50 shadow-xl' 
                        : 'bg-[#1E1E1E]/60 border-white/5 hover:border-white/10'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                      className="w-full text-left px-5 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`font-mono text-xl sm:text-2xl font-bold transition-colors ${isExpanded ? 'text-[#D4AF37]' : 'text-[#A0A0A0]/50'}`}>
                          {phase.number}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-md sm:text-lg font-bold text-[#F5F5F5]">{phase.title}</h3>
                            <span className="text-[10px] sm:text-xs font-mono bg-white/5 text-[#A0A0A0] px-2 py-0.5 rounded">
                              {phase.duration}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-0.5">{phase.subtitle}</p>
                        </div>
                      </div>
                      <div className={`p-1.5 rounded-full bg-white/5 text-[#A0A0A0] transition-transform duration-300 ${isExpanded ? 'rotate-180 text-[#D4AF37] bg-[#D4AF37]/10' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-[#121212]/30 space-y-4">
                            {phase.tips.map((tip, i) => {
                              const [title, desc] = tip.split(': ');
                              return (
                                <div key={i} className="flex items-start gap-3 text-sm">
                                  <div className="mt-1 shrink-0 w-2 h-2 rounded-full bg-[#D4AF37]" />
                                  <p className="text-[#A0A0A0] leading-relaxed">
                                    <strong className="text-[#F5F5F5]">{title}:</strong> {desc}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Dynamic Visual Support / Context Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-8 space-y-6">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-[16/10] lg:aspect-square group shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1598252579319-8176c1a87c53?auto=format&fit=crop&q=80&w=800" 
                alt="Sterile professional tattoo setup" 
                className="w-full h-full object-cover grayscale brightness-90 contrast-125 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/90 text-[#121212] px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Clinical Standards
                </div>
                <h4 className="text-xl font-bold text-white mb-1">Professional Hygiene</h4>
                <p className="text-sm text-[#A0A0A0]">
                  Every procedure is executed in a fully licensed, sterile environment using medical-grade equipment.
                </p>
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="bg-[#1E1E1E] border border-white/5 rounded-xl p-5 flex items-start gap-4">
              <Info className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                Need direct assistance during your recovery? You can reach Jake directly at <strong className="text-[#F5F5F5]">07494 568 281</strong> or email us if you notice any unusual swelling or signs of concern.
              </p>
            </div>
          </div>

        </div>

        {/* Do's & Don'ts Section */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight mb-4 font-serif">
              The Do’s & Don’ts of Tattoo Recovery
            </h2>
            <p className="text-[#A0A0A0] text-sm sm:text-base">
              A straightforward guide to what you should prioritize and what you must avoid to ensure optimal ink retention and quick healing.
            </p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* DO's Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#1E1E1E] border-t-4 border-[#16A34A] rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#16A34A]/10 text-[#16A34A] rounded-lg">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Essential Do's</h3>
              </div>
              <ul className="space-y-4">
                {dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5" />
                    <span className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                      <strong className="text-[#F5F5F5]">DO</strong> {item.replace('DO ', '')}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* DONT's Card */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#1E1E1E] border-t-4 border-red-600 rounded-2xl p-6 sm:p-8 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-600/10 text-red-600 rounded-lg">
                  <XCircle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Critical Don'ts</h3>
              </div>
              <ul className="space-y-4">
                {donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <span className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                      <strong className="text-[#F5F5F5]">DON'T</strong> {item.replace("DON'T ", '')}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>

        {/* Recommended Products */}
        <div className="bg-[#1E1E1E] border border-white/5 rounded-2xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Recommended Care
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight font-serif">
                Approved Products
              </h2>
              <p className="text-[#A0A0A0] text-sm sm:text-base leading-relaxed">
                Using the right skincare products makes an immense difference in healing times and prevents unnecessary ink fading. Avoid heavily fragranced cosmetic lotions.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Product 1 */}
              <div className="bg-[#121212] border border-white/5 p-5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg shrink-0">
                  <Droplet className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1 text-[#F5F5F5]">Cleansing Soap</h4>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                    Simple, unscented, dye-free antibacterial liquid soap (e.g., Carex Sensitive or simple baby soap).
                  </p>
                </div>
              </div>

              {/* Product 2 */}
              <div className="bg-[#121212] border border-white/5 p-5 rounded-xl flex items-start gap-4">
                <div className="p-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base mb-1 text-[#F5F5F5]">Healing Ointments</h4>
                  <p className="text-xs sm:text-sm text-[#A0A0A0] leading-relaxed">
                    Bepanthen Tattoo Ointment, Palmer&apos;s Cocoa Butter (fragrance-free), or specialized tattoo brands like Hustle Butter.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}