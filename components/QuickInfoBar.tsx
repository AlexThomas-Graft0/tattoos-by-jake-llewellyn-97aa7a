'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { MapPin, Clock, Mail, Phone, Copy, Check } from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export function QuickInfoBar() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="relative w-full bg-[#121212] py-4">
      {/* Glow Effect Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/5 via-transparent to-[#D4AF37]/5 pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Outer Bar Container */}
        <div className="bg-[#1E1E1E] border-y border-[#D4AF37]/40 shadow-xl shadow-black/50 rounded-lg md:rounded-none overflow-hidden">
          <div className="grid grid-cols-1 divide-y divide-[#D4AF37]/20 md:grid-cols-3 md:divide-y-0 md:divide-x divide-[#D4AF37]/20">
            
            {/* Location Section */}
            <motion.div 
              variants={itemVariants}
              className="group relative flex flex-col justify-between p-5 transition-all duration-300 hover:bg-black/20"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#121212] p-3 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors duration-300">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono tracking-wider uppercase text-[#A0A0A0]">Studio Location</span>
                  <address className="not-italic text-sm font-medium text-[#F5F5F5] leading-relaxed">
                    6A Gwerthonor Place, <br />
                    Gilfach Bargoed, CF81 8JQ
                  </address>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#D4AF37]/10 pt-3">
                <a 
                  href="#location" 
                  className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                >
                  View Parking & Transit
                </a>
                <button
                  onClick={() => copyToClipboard('6A Gwerthonor Place, Gilfach Bargoed, CF81 8JQ', 'address')}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#A0A0A0] hover:text-[#D4AF37] transition-colors focus-visible:outline-none"
                  aria-label="Copy studio address"
                >
                  {copiedText === 'address' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Opening Hours Section */}
            <motion.div 
              variants={itemVariants}
              className="group relative flex flex-col justify-between p-5 transition-all duration-300 hover:bg-black/20"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#121212] p-3 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors duration-300">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-mono tracking-wider uppercase text-[#A0A0A0]">Opening Hours</span>
                  <p className="text-sm font-medium text-[#F5F5F5]">
                    Tuesday – Saturday: <br />
                    <span className="text-white font-semibold">10:00 AM – 6:00 PM</span>
                  </p>
                  <p className="text-xs text-[#A0A0A0]">Sunday & Monday: Closed</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#D4AF37]/10 pt-3">
                <a 
                  href="#contact" 
                  className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                >
                  Full Hours Details
                </a>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D4AF37]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#D4AF37] border border-[#D4AF37]/20">
                  By Appointment
                </span>
              </div>
            </motion.div>

            {/* Direct Contact Section */}
            <motion.div 
              variants={itemVariants}
              className="group relative flex flex-col justify-between p-5 transition-all duration-300 hover:bg-black/20"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-[#121212] p-3 text-[#D4AF37] border border-[#D4AF37]/20 group-hover:border-[#D4AF37] transition-colors duration-300">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-xs font-mono tracking-wider uppercase text-[#A0A0A0]">Direct Contact</span>
                  <p className="truncate text-sm font-medium text-[#F5F5F5] hover:text-[#D4AF37] transition-colors">
                    <a href="mailto:info@jakellewellyntattoos.co.uk" className="block truncate">
                      info@jakellewellyntattoos.co.uk
                    </a>
                  </p>
                  <p className="text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors">
                    <a href="tel:07494568281">07494 568 281</a>
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#D4AF37]/10 pt-3">
                <a 
                  href="#book" 
                  className="text-xs font-semibold uppercase tracking-wider text-[#D4AF37] hover:text-[#F5F5F5] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
                >
                  Book Consultation
                </a>
                <button
                  onClick={() => copyToClipboard('info@jakellewellyntattoos.co.uk', 'email')}
                  className="flex items-center gap-1.5 text-xs font-mono text-[#A0A0A0] hover:text-[#D4AF37] transition-colors focus-visible:outline-none"
                  aria-label="Copy studio email"
                >
                  {copiedText === 'email' ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      <span className="text-emerald-500">Copied Email</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-3 w-3" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}