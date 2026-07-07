'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Compass, 
  Maximize, 
  Palette, 
  HelpCircle, 
  FileText, 
  Upload, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft,
  Check,
  ShieldCheck,
  MapPin,
  Clock
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

// Type definitions for the booking form state
interface BookingFormState {
  client_name: string;
  client_email: string;
  client_phone: string;
  placement: string;
  approx_size: string;
  color_preference: 'blackwork' | 'black-grey' | 'full-color' | 'fineline' | '';
  is_coverup: 'no' | 'yes-tattoo' | 'yes-scarring' | '';
  description: string;
  reference_image_url: string;
  preferred_days: string[];
  approx_budget: string;
  age_confirmed: boolean;
  deposit_confirmed: boolean;
}

const PLACEMENT_OPTIONS = [
  'Forearm (Inner/Outer)',
  'Upper Arm / Shoulder',
  'Full Sleeve',
  'Chest / Collarbone',
  'Back (Upper/Lower/Full)',
  'Thigh',
  'Calf / Shin',
  'Hand / Fingers',
  'Ribs / Torso',
  'Other (Please specify in description)'
];

const COLOR_PREFERENCES = [
  { id: 'blackwork', label: 'Solid Black / Heavy Blackwork' },
  { id: 'black-grey', label: 'Black & Grey Shading' },
  { id: 'full-color', label: 'Full Color' },
  { id: 'fineline', label: 'Fine Line / Minimal Shading' }
];

const COVERUP_OPTIONS = [
  { id: 'no', label: 'No, this is fresh skin.' },
  { id: 'yes-tattoo', label: 'Yes, covering an old tattoo.' },
  { id: 'yes-scarring', label: 'Yes, covering scarring.' }
];

const WEEKDAYS = [
  { id: 'Tuesday', label: 'Tuesday' },
  { id: 'Wednesday', label: 'Wednesday' },
  { id: 'Thursday', label: 'Thursday' },
  { id: 'Friday', label: 'Friday' },
  { id: 'Saturday', label: 'Saturday' }
];

// Motion variants with required type annotation to avoid build errors
const slideVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
};

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

export function BookingForm() {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormState>({
    client_name: '',
    client_email: '',
    client_phone: '',
    placement: '',
    approx_size: '',
    color_preference: '',
    is_coverup: '',
    description: '',
    reference_image_url: '',
    preferred_days: [],
    approx_budget: '',
    age_confirmed: false,
    deposit_confirmed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Form validation helper
  const isStepValid = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return (
          formData.client_name.trim() !== '' &&
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.client_email) &&
          formData.client_phone.trim() !== ''
        );
      case 2:
        return (
          formData.placement !== '' &&
          formData.approx_size.trim() !== '' &&
          formData.color_preference !== '' &&
          formData.is_coverup !== '' &&
          formData.description.trim().length >= 30
        );
      case 3:
        return (
          formData.preferred_days.length > 0 &&
          formData.age_confirmed &&
          formData.deposit_confirmed
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (isStepValid(step)) {
      setStep((prev) => prev + 1);
      setErrorMsg(null);
    } else {
      setErrorMsg('Please complete all required fields correctly before continuing.');
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
    setErrorMsg(null);
  };

  const handleCheckboxChange = (day: string) => {
    setFormData((prev) => {
      const updatedDays = prev.preferred_days.includes(day)
        ? prev.preferred_days.filter((d) => d !== day)
        : [...prev.preferred_days, day];
      return { ...prev, preferred_days: updatedDays };
    });
  };

  // Simulate file upload cleanly
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg('File is too large. Max size is 5MB.');
        return;
      }
      setFileName(file.name);
      // Mocking a successful upload URL
      setFormData((prev) => ({
        ...prev,
        reference_image_url: 'https://images.unsplash.com/photo-1598252571565-174db56ee71c?auto=format&fit=crop&q=80&w=1200'
      }));
      setErrorMsg(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid(3)) {
      setErrorMsg('Please accept the studio policies and confirm you are 18+ to proceed.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert({
          client_name: formData.client_name,
          client_email: formData.client_email,
          client_phone: formData.client_phone,
          placement: formData.placement,
          approx_size: formData.approx_size,
          is_coverup: formData.is_coverup !== 'no',
          description: formData.description,
          reference_image_url: formData.reference_image_url || null,
          preferred_days: formData.preferred_days,
          status: 'pending'
        });

      if (error) throw error;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting form:', err);
      setErrorMsg(err?.message || 'An error occurred while submitting your consultation request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#121212] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans text-[#F5F5F5]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] opacity-5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
            Custom Ink Inquiry
          </span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-[#F5F5F5]">
            Book a Tattoo Consultation
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-[#A0A0A0] leading-relaxed">
            Please complete this form with as much detail as possible. This structured information allows me to understand your ideas, prepare a realistic quote, and design a custom piece that fits your body perfectly.
          </p>
          <p className="mt-2 text-xs text-[#D4AF37]/80 italic">
            *If you are looking to get multiple tattoos, please submit a separate form for each distinct project.*
          </p>
        </div>

        {/* Info Highlights Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-[#1E1E1E] border border-white/5 rounded-xl p-4 text-center">
          <div className="flex flex-col items-center p-2">
            <MapPin className="h-5 w-5 text-[#D4AF37] mb-2" />
            <span className="text-xs font-semibold text-white">Location</span>
            <span className="text-xs text-[#A0A0A0]">6A Gwerthonor Place, Gilfach</span>
          </div>
          <div className="flex flex-col items-center p-2 border-y md:border-y-0 md:border-x border-white/5">
            <Clock className="h-5 w-5 text-[#D4AF37] mb-2" />
            <span className="text-xs font-semibold text-white">Studio Hours</span>
            <span className="text-xs text-[#A0A0A0]">Tue - Sat: 10 AM - 6 PM</span>
          </div>
          <div className="flex flex-col items-center p-2">
            <ShieldCheck className="h-5 w-5 text-[#D4AF37] mb-2" />
            <span className="text-xs font-semibold text-white">Hygienic Standards</span>
            <span className="text-xs text-[#A0A0A0]">100% Sterile & Licensed</span>
          </div>
        </div>

        {/* Main Workspace Frame */}
        <div className="bg-[#1E1E1E] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Progress Indicator */}
          {!isSuccess && (
            <div className="bg-[#151515] px-6 py-4 border-b border-white/5">
              <div className="flex items-center justify-between max-w-md mx-auto">
                <div className="flex flex-col items-center relative">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= 1 ? 'bg-[#D4AF37] text-[#121212]' : 'bg-[#2A2A2A] text-[#A0A0A0]'
                  }`}>
                    {step > 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider mt-1.5 font-medium text-white">Contact</span>
                </div>
                
                <div className={`flex-1 h-0.5 mx-4 transition-colors ${step >= 2 ? 'bg-[#D4AF37]/50' : 'bg-[#2A2A2A]'}`} />

                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= 2 ? 'bg-[#D4AF37] text-[#121212]' : 'bg-[#2A2A2A] text-[#A0A0A0]'
                  }`}>
                    {step > 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider mt-1.5 font-medium text-white">Project Details</span>
                </div>

                <div className={`flex-1 h-0.5 mx-4 transition-colors ${step >= 3 ? 'bg-[#D4AF37]/50' : 'bg-[#2A2A2A]'}`} />

                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    step >= 3 ? 'bg-[#D4AF37] text-[#121212]' : 'bg-[#2A2A2A] text-[#A0A0A0]'
                  }`}>
                    3
                  </div>
                  <span className="text-[10px] uppercase tracking-wider mt-1.5 font-medium text-white">Terms</span>
                </div>
              </div>
            </div>
          )}

          {/* Form / Content Area */}
          <div className="p-6 sm:p-10">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMsg && (
                    <motion.div 
                      variants={fadeVariants}
                      initial="hidden"
                      animate="visible"
                      className="p-4 bg-red-950/40 border border-red-500/30 text-red-200 text-sm rounded-lg flex items-start gap-3"
                    >
                      <AlertTriangle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <div>{errorMsg}</div>
                    </motion.div>
                  )}

                  {/* STEP 1: CONTACT DETAILS */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="border-b border-white/5 pb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <User className="text-[#D4AF37] h-5 w-5" />
                          Step 1: Contact Information
                        </h2>
                        <p className="text-xs text-[#A0A0A0] mt-1">Provide your basic contact details so I can reach out with quote estimates.</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                            Full Name <span className="text-[#D4AF37]">*</span>
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A0A0A0]">
                              <User className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              required
                              placeholder="e.g., Dylan Evans"
                              value={formData.client_name}
                              onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                              className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                              Email Address <span className="text-[#D4AF37]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A0A0A0]">
                                <Mail className="h-4 w-4" />
                              </span>
                              <input
                                type="email"
                                required
                                placeholder="e.g., dylan.evans@example.co.uk"
                                value={formData.client_email}
                                onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                                className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                              Phone Number <span className="text-[#D4AF37]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A0A0A0]">
                                <Phone className="h-4 w-4" />
                              </span>
                              <input
                                type="tel"
                                required
                                placeholder="e.g., 07123 456789"
                                value={formData.client_phone}
                                onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                                className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2: PROJECT SPECIFICATIONS */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="border-b border-white/5 pb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <Compass className="text-[#D4AF37] h-5 w-5" />
                          Step 2: Project Specifications
                        </h2>
                        <p className="text-xs text-[#A0A0A0] mt-1">Tell me about the design you want, its size, location, and references.</p>
                      </div>

                      <div className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                              Tattoo Placement <span className="text-[#D4AF37]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                required
                                value={formData.placement}
                                onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                                className="block w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm appearance-none cursor-pointer"
                              >
                                <option value="" disabled>-- Select Placement --</option>
                                {PLACEMENT_OPTIONS.map((opt) => (
                                  <option key={opt} value={opt} className="bg-[#1E1E1E]">{opt}</option>
                                ))}
                              </select>
                              <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#A0A0A0]">
                                ▼
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                              Estimated Dimensions <span className="text-[#D4AF37]">*</span>
                            </label>
                            <div className="relative">
                              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A0A0A0]">
                                <Maximize className="h-4 w-4" />
                              </span>
                              <input
                                type="text"
                                required
                                placeholder="e.g., 15cm height x 10cm width"
                                value={formData.approx_size}
                                onChange={(e) => setFormData({ ...formData, approx_size: e.target.value })}
                                className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm"
                              />
                            </div>
                            <span className="block text-[10px] text-[#A0A0A0] mt-1">
                              Please measure the general area on your body to help estimate detail density and session duration.
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-3">
                            Color Preference <span className="text-[#D4AF37]">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {COLOR_PREFERENCES.map((pref) => (
                              <label
                                key={pref.id}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                                  formData.color_preference === pref.id
                                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                                    : 'bg-[#121212] border-white/5 text-white hover:border-white/20'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="color_preference"
                                  value={pref.id}
                                  checked={formData.color_preference === pref.id}
                                  onChange={() => setFormData({ ...formData, color_preference: pref.id as any })}
                                  className="sr-only"
                                />
                                <Palette className="h-4 w-4 shrink-0" />
                                <span className="text-xs font-medium">{pref.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-3">
                            Is this a cover-up project? <span className="text-[#D4AF37]">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {COVERUP_OPTIONS.map((opt) => (
                              <label
                                key={opt.id}
                                className={`flex flex-col justify-center items-start px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                                  formData.is_coverup === opt.id
                                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                                    : 'bg-[#121212] border-white/5 text-white hover:border-white/20'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="is_coverup"
                                  value={opt.id}
                                  checked={formData.is_coverup === opt.id}
                                  onChange={() => setFormData({ ...formData, is_coverup: opt.id as any })}
                                  className="sr-only"
                                />
                                <span className="text-xs font-bold mb-0.5">{opt.id === 'no' ? 'Fresh Skin' : 'Cover-up'}</span>
                                <span className="text-[10px] text-[#A0A0A0]">{opt.label}</span>
                              </label>
                            ))}
                          </div>
                          {formData.is_coverup !== 'no' && formData.is_coverup !== '' && (
                            <p className="mt-2 text-[10px] text-[#D4AF37] flex items-center gap-1.5">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              Cover-ups require specific planning. Please upload a clear photo of the existing tattoo/scarring below.
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                            Project Description & Concept <span className="text-[#D4AF37]">*</span>
                          </label>
                          <textarea
                            required
                            rows={4}
                            placeholder="Describe your idea. What elements would you like included? What is the main focal point? If you are claiming a specific flash design, write the design name here."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="block w-full px-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm resize-none"
                          />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-[#A0A0A0]">
                              Minimum 30 characters required.
                            </span>
                            <span className={`text-[10px] ${formData.description.trim().length >= 30 ? 'text-green-400' : 'text-amber-500'}`}>
                              {formData.description.trim().length} / 30 min chars
                            </span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                            Upload Reference Images
                          </label>
                          <div className="border border-dashed border-white/10 rounded-lg bg-[#121212] p-6 text-center hover:border-[#D4AF37]/50 transition-all cursor-pointer relative">
                            <input
                              type="file"
                              accept="image/png, image/jpeg, image/jpg"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <Upload className="h-8 w-8 mx-auto text-[#A0A0A0] mb-2" />
                            <p className="text-xs text-white font-medium">
                              {fileName ? `Selected: ${fileName}` : 'Click or drag image file to upload'}
                            </p>
                            <p className="text-[10px] text-[#A0A0A0] mt-1">
                              PNG, JPG, JPEG up to 5MB (Max 3 files)
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: LOGISTICS & POLICIES */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      variants={slideVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="space-y-6"
                    >
                      <div className="border-b border-white/5 pb-4">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                          <FileText className="text-[#D4AF37] h-5 w-5" />
                          Step 3: Logistics & Studio Terms
                        </h2>
                        <p className="text-xs text-[#A0A0A0] mt-1">Set your calendar preferences and sign off on studio requirements.</p>
                      </div>

                      <div className="space-y-5">
                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-3">
                            Preferred Booking Days <span className="text-[#D4AF37]">*</span>
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                            {WEEKDAYS.map((day) => {
                              const isChecked = formData.preferred_days.includes(day.id);
                              return (
                                <label
                                  key={day.id}
                                  className={`flex flex-col items-center justify-center p-3 rounded-lg border cursor-pointer text-center transition-all ${
                                    isChecked
                                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]'
                                      : 'bg-[#121212] border-white/5 text-white hover:border-white/20'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(day.id)}
                                    className="sr-only"
                                  />
                                  <Calendar className="h-4 w-4 mb-1 shrink-0" />
                                  <span className="text-xs font-medium">{day.label}</span>
                                </label>
                              );
                            })}
                          </div>
                          <span className="block text-[10px] text-[#A0A0A0] mt-1.5">
                            Select at least one day you are generally available to attend sessions.
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs uppercase tracking-wider text-[#A0A0A0] font-semibold mb-2">
                            Estimated Budget (Optional)
                          </label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#A0A0A0]">
                              <DollarSign className="h-4 w-4" />
                            </span>
                            <input
                              type="text"
                              placeholder="e.g., £200 - £300"
                              value={formData.approx_budget}
                              onChange={(e) => setFormData({ ...formData, approx_budget: e.target.value })}
                              className="block w-full pl-10 pr-4 py-3 bg-[#121212] border border-white/10 rounded-lg text-white placeholder-white/35 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:border-[#D4AF37] transition-all text-sm"
                            />
                          </div>
                          <span className="block text-[10px] text-[#A0A0A0] mt-1">
                            This helps me design a piece that fits within your budget limitations.
                          </span>
                        </div>

                        {/* Highlighted Studio Policies Box */}
                        <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl p-5 space-y-4">
                          <h3 className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-[#D4AF37]" />
                            Mandatory Studio Policies Agreement
                          </h3>
                          
                          <div className="space-y-3">
                            <label className="flex items-start gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                required
                                checked={formData.age_confirmed}
                                onChange={(e) => setFormData({ ...formData, age_confirmed: e.target.checked })}
                                className="mt-1 h-4 w-4 rounded border-white/10 text-[#D4AF37] focus:ring-0 focus:ring-offset-0 bg-[#1E1E1E]"
                              />
                              <span className="text-xs text-[#A0A0A0] group-hover:text-white transition-colors leading-relaxed">
                                <strong className="text-white">Age Requirement:</strong> I confirm that I am 18 years of age or older. (By law, it is illegal to tattoo anyone under the age of 18 in the UK, even with parental consent). <span className="text-[#D4AF37]">*</span>
                              </span>
                            </label>

                            <label className="flex items-start gap-3 cursor-pointer group">
                              <input
                                type="checkbox"
                                required
                                checked={formData.deposit_confirmed}
                                onChange={(e) => setFormData({ ...formData, deposit_confirmed: e.target.checked })}
                                className="mt-1 h-4 w-4 rounded border-white/10 text-[#D4AF37] focus:ring-0 focus:ring-offset-0 bg-[#1E1E1E]"
                              />
                              <span className="text-xs text-[#A0A0A0] group-hover:text-white transition-colors leading-relaxed">
                                <strong className="text-white">Deposit & Cancellation:</strong> I understand that a non-refundable deposit is required to secure any booking date. This deposit goes toward the final cost of the tattoo. Cancellations or reschedules require at least 48 hours' notice, or the deposit will be forfeited. <span className="text-[#D4AF37]">*</span>
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={isSubmitting}
                        className="px-5 py-2.5 rounded-lg border border-white/10 text-[#F5F5F5] hover:bg-white/5 transition-all text-xs font-semibold flex items-center gap-2"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 bg-[#D4AF37] text-[#121212] hover:bg-[#E5BE48] active:scale-95 transition-all text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-[#D4AF37]/10"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-[#D4AF37] text-[#121212] hover:bg-[#E5BE48] active:scale-95 transition-all text-xs font-bold rounded-lg flex items-center gap-2 shadow-lg shadow-[#D4AF37]/20 disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-4 w-4 border-2 border-[#121212] border-t-transparent rounded-full animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            Submit Consultation Request
                            <CheckCircle className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                /* SUCCESS SCREEN */
                <motion.div
                  key="success"
                  variants={fadeVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-8 space-y-6"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 mb-2">
                    <CheckCircle className="h-8 w-8 stroke-[1.5]" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Inquiry Received!
                    </h2>
                    <p className="text-sm text-[#A0A0A0] max-w-lg mx-auto">
                      Thank you for submitting your design consultation request, <strong className="text-white">{formData.client_name}</strong>.
                    </p>
                  </div>

                  {/* Next steps timeline */}
                  <div className="max-w-md mx-auto bg-[#121212] border border-white/5 rounded-xl p-5 text-left space-y-4">
                    <h3 className="text-xs uppercase tracking-wider text-[#D4AF37] font-bold">
                      What Happens Next?
                    </h3>
                    
                    <ul className="space-y-3.5">
                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold shrink-0 mt-0.5">
                          1
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">Design Review</h4>
                          <p className="text-[11px] text-[#A0A0A0] mt-0.5">I will personally review your concept, reference images, and placement details within 2 to 3 business days.</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold shrink-0 mt-0.5">
                          2
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">Initial Quote</h4>
                          <p className="text-[11px] text-[#A0A0A0] mt-0.5">I will send you an email with an estimated price range and a time estimate for your session.</p>
                        </div>
                      </li>

                      <li className="flex items-start gap-3">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold shrink-0 mt-0.5">
                          3
                        </span>
                        <div>
                          <h4 className="text-xs font-bold text-white">Secure Your Date</h4>
                          <p className="text-[11px] text-[#A0A0A0] mt-0.5">If you're happy to proceed, I will send you a link to pay your deposit and we will lock in your appointment date.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <p className="text-xs text-[#A0A0A0]">
                    A confirmation copy of this request has been sent to <span className="text-white font-medium">{formData.client_email}</span>.
                  </p>

                  <button
                    onClick={() => {
                      setFormData({
                        client_name: '',
                        client_email: '',
                        client_phone: '',
                        placement: '',
                        approx_size: '',
                        color_preference: '',
                        is_coverup: '',
                        description: '',
                        reference_image_url: '',
                        preferred_days: [],
                        approx_budget: '',
                        age_confirmed: false,
                        deposit_confirmed: false,
                      });
                      setStep(1);
                      setIsSuccess(false);
                      setFileName(null);
                    }}
                    className="mt-4 px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-semibold transition-all"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}