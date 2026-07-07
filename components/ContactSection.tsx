'use client';

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Car, 
  Train, 
  Bus, 
  Info, 
  ChevronRight, 
  Map, 
  Compass, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';

export function ContactSection() {
  const [activeTab, setActiveTab] = useState<'parking' | 'train' | 'bus'>('parking');
  const [copiedText, setCopiedText] = useState<string | null>(null);

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
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const mapOverlayVariants: Variants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 3000);
  };

  const hours = [
    { day: 'Monday', time: 'CLOSED', isClosed: true },
    { day: 'Tuesday', time: '10:00 AM – 6:00 PM', isClosed: false },
    { day: 'Wednesday', time: '10:00 AM – 6:00 PM', isClosed: false },
    { day: 'Thursday', time: '10:00 AM – 6:00 PM', isClosed: false },
    { day: 'Friday', time: '10:00 AM – 6:00 PM', isClosed: false },
    { day: 'Saturday', time: '10:00 AM – 6:00 PM', isClosed: false },
    { day: 'Sunday', time: 'CLOSED', isClosed: true },
  ];

  return (
    <section 
      id="contact" 
      className="relative bg-[#121212] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans border-t border-[#1E1E1E]"
    >
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#D4AF37] text-xs font-semibold uppercase tracking-[0.2em] block mb-3">
            Plan Your Visit
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#F5F5F5] mb-6 font-mono uppercase">
            Find the Studio
          </h2>
          <p className="text-[#A0A0A0] text-lg sm:text-xl leading-relaxed">
            Get in touch, plan your visit, or find directions to the studio in Gilfach Bargoed.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          
          {/* Left Column: Direct Contact & Opening Hours */}
          <motion.div className="lg:col-span-5 space-y-8" variants={itemVariants}>
            
            {/* Studio Address Card */}
            <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-8 hover:border-[#D4AF37]/40 transition-all duration-300 shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#121212] rounded-xl border border-zinc-800 text-[#D4AF37]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">Studio Location</h3>
                  <p className="text-[#F5F5F5] font-semibold text-lg leading-snug">
                    Tattoos by Jake Llewellyn
                  </p>
                  <p className="text-[#A0A0A0] mt-1 text-sm sm:text-base leading-relaxed">
                    6A Gwerthonor Place,<br />
                    Gilfach Bargoed,<br />
                    CF81 8JQ, Wales
                  </p>
                  
                  <div className="mt-6 flex flex-wrap gap-3">
                    <button 
                      onClick={() => handleCopy("6A Gwerthonor Place, Gilfach Bargoed, CF81 8JQ", "address")}
                      className="text-xs bg-[#121212] hover:bg-zinc-800 text-[#F5F5F5] border border-zinc-800 py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                    >
                      {copiedText === 'address' ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37]" />
                          Copied!
                        </>
                      ) : (
                        <>Copy Address</>
                      )}
                    </button>
                    <a 
                      href="https://maps.google.com/?q=6A+Gwerthonor+Place,+Gilfach+Bargoed,+CF81+8JQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs bg-[#D4AF37] hover:bg-[#bfa032] text-[#121212] font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      Open in Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours Panel */}
            <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
                <h3 className="text-lg font-bold uppercase tracking-wider text-[#F5F5F5] font-mono">
                  Opening Hours
                </h3>
              </div>
              
              <div className="divide-y divide-zinc-800/60">
                {hours.map((item) => (
                  <div 
                    key={item.day} 
                    className="py-3 flex justify-between items-center text-sm sm:text-base"
                  >
                    <span className={`font-medium ${item.isClosed ? 'text-[#A0A0A0]' : 'text-[#F5F5F5]'}`}>
                      {item.day}
                    </span>
                    <span className={`font-mono text-sm ${
                      item.isClosed 
                        ? 'text-zinc-600 font-semibold uppercase' 
                        : 'text-[#D4AF37]'
                    }`}>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Contact Grid */}
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest text-[#A0A0A0] font-bold px-1">
                Direct Contact Channels
              </h4>
              <p className="text-xs text-[#A0A0A0] px-1 italic">
                For non-booking questions, general business inquiries, or media requests, reach out directly:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email */}
                <div 
                  onClick={() => handleCopy("info@jakellewellyntattoos.co.uk", "email")}
                  className="bg-[#1E1E1E] hover:bg-zinc-800/40 border border-zinc-800 p-4 rounded-xl transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <div className="p-2 bg-[#121212] rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[#A0A0A0] uppercase font-semibold">Email</p>
                    <p className="text-xs sm:text-sm text-[#F5F5F5] font-mono truncate">
                      {copiedText === 'email' ? 'Copied to clipboard' : 'info@jakellewellyntattoos.co.uk'}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div 
                  onClick={() => handleCopy("07494 568 281", "phone")}
                  className="bg-[#1E1E1E] hover:bg-zinc-800/40 border border-zinc-800 p-4 rounded-xl transition-all cursor-pointer flex items-center gap-3 group"
                >
                  <div className="p-2 bg-[#121212] rounded-lg text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#A0A0A0] uppercase font-semibold">Phone</p>
                    <p className="text-xs sm:text-sm text-[#F5F5F5] font-mono">
                      {copiedText === 'phone' ? 'Copied to clipboard' : '07494 568 281'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive Simulated Map & Local Parking / Transit Guides */}
          <motion.div className="lg:col-span-7 space-y-8" variants={itemVariants}>
            
            {/* Interactive Simulated Map */}
            <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl relative group">
              <div className="absolute top-4 left-4 z-10 bg-[#121212]/90 backdrop-blur-md border border-zinc-800 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
                <div className="text-left">
                  <p className="text-[10px] text-[#A0A0A0] uppercase font-bold tracking-wider leading-none">Studio Location</p>
                  <p className="text-xs text-[#F5F5F5] font-mono mt-0.5">CF81 8JQ • Gilfach Bargoed</p>
                </div>
              </div>

              {/* Map Canvas Frame */}
              <div className="relative h-[340px] w-full bg-[#151515] overflow-hidden flex items-center justify-center">
                {/* Real-world styled beautiful dark map background */}
                <motion.img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200" 
                  alt="Stylized Street Map Overview" 
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter grayscale contrast-125 scale-110"
                  variants={mapOverlayVariants}
                  whileHover="hover"
                />
                
                {/* Simulated Map UI Elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/40 pointer-events-none" />
                
                {/* Central pin indicator */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#D4AF37]/30 rounded-full blur-md animate-ping duration-1000" />
                    <div className="relative p-4 bg-[#121212] border-2 border-[#D4AF37] rounded-full shadow-2xl">
                      <Compass className="w-8 h-8 text-[#D4AF37] animate-spin-slow" />
                    </div>
                  </div>
                  <div className="mt-3 bg-[#121212] border border-zinc-800 px-4 py-1.5 rounded-lg text-center shadow-lg">
                    <p className="text-xs font-bold text-[#F5F5F5] font-mono">6A Gwerthonor Place</p>
                    <p className="text-[10px] text-[#A0A0A0]">Look for the professional exterior signage</p>
                  </div>
                </div>

                {/* Map Utilities */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-1.5 z-10">
                  <div className="bg-[#121212]/90 backdrop-blur-md border border-zinc-800 p-2 rounded-lg flex flex-col items-center justify-center text-xs font-mono font-bold text-[#F5F5F5]">
                    <span className="text-[9px] text-[#A0A0A0] uppercase font-bold tracking-wider">LAT</span>
                    51.6912
                  </div>
                  <div className="bg-[#121212]/90 backdrop-blur-md border border-zinc-800 p-2 rounded-lg flex flex-col items-center justify-center text-xs font-mono font-bold text-[#F5F5F5]">
                    <span className="text-[9px] text-[#A0A0A0] uppercase font-bold tracking-wider">LNG</span>
                    -3.2274
                  </div>
                </div>
              </div>

              {/* Find Me Instructions Block */}
              <div className="p-6 border-t border-zinc-800/80 bg-zinc-900/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#1E1E1E] border border-zinc-800 rounded-lg text-[#D4AF37]">
                    <Info className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#F5F5F5] uppercase tracking-wide">How to Find Me</h4>
                    <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1 leading-relaxed">
                      My private studio is located on Gwerthonor Place in Gilfach Bargoed. Look for the professional exterior signage. We are easily accessible from the main roads through Caerphilly County Borough.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel, Transit & Parking Tabs */}
            <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="flex border-b border-zinc-800">
                <button 
                  onClick={() => setActiveTab('parking')}
                  className={`flex-1 py-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                    activeTab === 'parking' 
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-zinc-900/30' 
                      : 'border-transparent text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-zinc-900/10'
                  }`}
                >
                  <Car className="w-4 h-4" />
                  Parking
                </button>
                <button 
                  onClick={() => setActiveTab('train')}
                  className={`flex-1 py-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                    activeTab === 'train' 
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-zinc-900/30' 
                      : 'border-transparent text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-zinc-900/10'
                  }`}
                >
                  <Train className="w-4 h-4" />
                  By Train
                </button>
                <button 
                  onClick={() => setActiveTab('bus')}
                  className={`flex-1 py-4 px-4 text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                    activeTab === 'bus' 
                      ? 'border-[#D4AF37] text-[#D4AF37] bg-zinc-900/30' 
                      : 'border-transparent text-[#A0A0A0] hover:text-[#F5F5F5] hover:bg-zinc-900/10'
                  }`}
                >
                  <Bus className="w-4 h-4" />
                  By Bus
                </button>
              </div>

              <div className="p-6 min-h-[160px] flex flex-col justify-between">
                <div>
                  {activeTab === 'parking' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-[#F5F5F5]">Free Street Parking</h5>
                          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
                            Available directly on Gwerthonor Place and surrounding residential streets. Please be mindful of local residents' driveways.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-[#F5F5F5]">Public Car Parks</h5>
                          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
                            There are free public car parks within a short 5-minute walk of the studio.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'train' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-[#F5F5F5]">Gilfach Fargoed Railway Station</h5>
                          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
                            The station is approximately a 10-minute walk from the studio, offering direct links to Cardiff and surrounding valleys.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'bus' && (
                    <div className="space-y-4 animate-fadeIn">
                      <div className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-2.5 shrink-0" />
                        <div>
                          <h5 className="font-bold text-sm text-[#F5F5F5]">Local Bus Routes</h5>
                          <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
                            Local bus routes stop regularly along the main road just a short walk from Gwerthonor Place.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Local SEO / Region Tag */}
                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-[#A0A0A0]">
                  <span>Caerphilly County Borough, Wales</span>
                  <span className="font-mono">51.6912° N, 3.2274° W</span>
                </div>
              </div>
            </div>

            {/* Bottom Call-To-Action Card */}
            <div className="bg-gradient-to-r from-zinc-900 to-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37] opacity-[0.02] rounded-full blur-xl pointer-events-none" />
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-[#F5F5F5]">Ready to start your tattoo journey?</h3>
                <p className="text-xs sm:text-sm text-[#A0A0A0] mt-1">
                  Secure your consultation with Jake to plan your custom custom piece.
                </p>
              </div>
              <a 
                href="#book" 
                className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#bfa032] text-[#121212] font-black text-xs sm:text-sm uppercase tracking-widest py-3.5 px-6 rounded-xl transition-all duration-300 shadow-lg shadow-[#D4AF37]/10 flex items-center justify-center gap-2 group shrink-0"
              >
                Inquiry Form
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}