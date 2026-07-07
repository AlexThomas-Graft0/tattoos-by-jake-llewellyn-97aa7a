'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface Step {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  detailPoints: string[];
}

const steps: Step[] = [
  {
    number: '01',
    title: '1. Submit Your Concept',
    subtitle: 'Inquire Online',
    description: 'Use the structured booking form to share your idea, placement, estimated size, and reference photos. This ensures I have all the details needed to review your project.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Custom line art illustration of tattoo concept planning',
    detailPoints: [
      'Concept review within 2-3 business days',
      'Upload up to 3 high-res reference photos',
      'Specify exact placement & approximate dimensions'
    ]
  },
  {
    number: '02',
    title: '2. Plan the Design',
    subtitle: 'The Consultation',
    description: 'We will review your ideas, confirm pricing, and secure your session with a deposit. I will then create a custom design tailored perfectly to your body\'s natural anatomy.',
    imageUrl: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Jake Llewellyn planning custom tattoo design layout',
    detailPoints: [
      'Anatomy-fitted bespoke stencil creation',
      'Transparent final pricing & time estimate',
      'Secure your appointment date with a deposit'
    ]
  },
  {
    number: '03',
    title: '3. Your Session',
    subtitle: 'Get Inked',
    description: 'Relax in a private, sterile, and comfortable environment. Every tattoo is executed using state-of-the-art hygienic equipment and premium, vegan-friendly inks.',
    imageUrl: 'https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?auto=format&fit=crop&w=1000&q=80',
    imageAlt: 'Sterile tattoo studio equipment and premium vegan inks',
    detailPoints: [
      '100% sterile, single-use needle cartridges',
      'Private, relaxed, and welcoming studio setup',
      'Comprehensive premium aftercare pack provided'
    ]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15
    }
  }
};

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section 
      id="process" 
      className="relative bg-[#121212] py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t border-b border-[#1E1E1E]"
    >
      {/* Subtle Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-4"
          >
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Journey From Idea To Art
            </span>
            <span className="h-px w-8 bg-[#D4AF37]" />
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-[#F5F5F5] tracking-tight uppercase font-sans"
          >
            From Concept to Skin: The Process
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-[#A0A0A0] max-w-2xl mx-auto"
          >
            Getting custom body art is a highly collaborative experience. Here is exactly what to expect from our first interaction to your final session.
          </motion.p>
        </div>

        {/* Desktop Split-Screen & Mobile Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Interactive Stepper (Steps list) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            {steps.map((step, index) => {
              const isActive = activeStep === index;
              return (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  onClick={() => setActiveStep(index)}
                  className={`group relative cursor-pointer text-left p-6 md:p-8 rounded-xl border transition-all duration-300 focus-within:ring-2 focus-within:ring-[#D4AF37] ${
                    isActive 
                      ? 'bg-[#1E1E1E] border-[#D4AF37] shadow-xl shadow-black/40' 
                      : 'bg-[#1E1E1E]/40 border-transparent hover:border-[#D4AF37]/30 hover:bg-[#1E1E1E]/60'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveStep(index);
                    }
                  }}
                >
                  {/* Accent Highlight Bar */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl transition-all duration-300 ${
                      isActive ? 'bg-[#D4AF37]' : 'bg-transparent group-hover:bg-[#D4AF37]/30'
                    }`} 
                  />

                  <div className="flex items-start gap-4 md:gap-6">
                    {/* Step Number Display */}
                    <div className="flex-shrink-0">
                      <span className={`block font-mono text-4xl md:text-5xl font-extrabold tracking-tighter transition-colors duration-300 ${
                        isActive ? 'text-[#D4AF37]' : 'text-[#A0A0A0]/40 group-hover:text-[#D4AF37]/60'
                      }`}>
                        {step.number}
                      </span>
                    </div>

                    {/* Step Content */}
                    <div className="flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-[#F5F5F5] uppercase tracking-wide">
                          {step.title}
                        </h3>
                        <span className={`text-xs uppercase tracking-widest font-semibold px-2 py-0.5 rounded ${
                          isActive ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-[#A0A0A0]/60'
                        }`}>
                          {step.subtitle}
                        </span>
                      </div>

                      <p className="text-sm md:text-base text-[#A0A0A0] leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Expandable Technical Detail Bullets */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.ul 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-2 overflow-hidden border-t border-[#121212] pt-4 mt-4"
                          >
                            {step.detailPoints.map((point, ptIdx) => (
                              <li key={ptIdx} className="flex items-center gap-2.5 text-xs md:text-sm text-[#F5F5F5]">
                                <svg 
                                  className="w-4 h-4 text-[#D4AF37] flex-shrink-0" 
                                  fill="none" 
                                  stroke="currentColor" 
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{point}</span>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column: Dynamic High-Contrast Image Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="relative group">
              {/* Decorative Frame Brackets */}
              <div className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#D4AF37]" />
              <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#D4AF37]" />
              <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37]" />

              {/* Main Image Viewport */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#1E1E1E] border border-[#1E1E1E]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 w-full h-full"
                  >
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 z-10" />
                    
                    {/* Actual Unsplash Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={steps[activeStep].imageUrl}
                      alt={steps[activeStep].imageAlt}
                      className="w-full h-full object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Image Caption Tag */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <span className="text-[10px] font-mono tracking-[0.2em] text-[#D4AF37] uppercase block mb-1">
                        Active Stage Visualization
                      </span>
                      <h4 className="text-lg font-bold text-[#F5F5F5] uppercase tracking-wide">
                        {steps[activeStep].subtitle}
                      </h4>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>

        {/* Global Process Call to Action Block */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-1 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37] to-[#D4AF37]/20 rounded-full">
            <a
              href="#book"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#121212] hover:bg-[#1E1E1E] text-[#F5F5F5] hover:text-[#D4AF37] font-bold uppercase tracking-wider text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
            >
              Start Your Project Today
              <svg 
                className="w-4 h-4 ml-2.5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <p className="mt-4 text-xs text-[#A0A0A0]">
            No obligation initial consultation. All inquiries processed within 48-72 hours.
          </p>
        </motion.div>

      </div>
    </section>
  );
}