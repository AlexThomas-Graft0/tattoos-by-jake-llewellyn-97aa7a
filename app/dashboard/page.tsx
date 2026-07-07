'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

// Types based on SQL schema
interface PortfolioItem {
  id: string
  title: string
  image_url: string
  category: string
  description: string
  created_at: string
}

interface InspirationItem {
  id: string
  title: string
  image_url: string
  status: 'available' | 'adopted'
  style_tag: string
  created_at: string
}

interface BookingRequest {
  id: string
  client_name: string
  client_email: string
  client_phone: string
  placement: string
  approx_size: string
  is_coverup: boolean
  description: string
  reference_image_url: string | null
  preferred_days: string[]
  status: 'pending' | 'reviewed' | 'archived'
  created_at: string
}

export default function OwnerDashboard() {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'bookings' | 'portfolio' | 'inspiration'>('bookings')

  // Global loading and feedback state
  const [loading, setLoading] = useState<boolean>(true)
  const [actionLoading, setActionLoading] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  // Data states
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [inspiration, setInspiration] = useState<InspirationItem[]>([])

  // Search/Filter states
  const [bookingFilter, setBookingFilter] = useState<'all' | 'pending' | 'reviewed' | 'archived'>('all')

  // Portfolio Form State
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null)
  const [portfolioTitle, setPortfolioTitle] = useState<string>('')
  const [portfolioImageUrl, setPortfolioImageUrl] = useState<string>('')
  const [portfolioCategory, setPortfolioCategory] = useState<string>('Realism')
  const [portfolioDescription, setPortfolioDescription] = useState<string>('')

  // Inspiration Form State
  const [editingInspirationId, setEditingInspirationId] = useState<string | null>(null)
  const [inspirationTitle, setInspirationTitle] = useState<string>('')
  const [inspirationImageUrl, setInspirationImageUrl] = useState<string>('')
  const [inspirationStatus, setInspirationStatus] = useState<'available' | 'adopted'>('available')
  const [inspirationStyleTag, setInspirationStyleTag] = useState<string>('')

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true)
    setErrorMsg(null)
    try {
      // Bookings
      const { data: bookingsData, error: bError } = await supabase
        .from('booking_requests')
        .select('*')
        .order('created_at', { ascending: false })
      if (bError) throw bError
      setBookings(bookingsData || [])

      // Portfolio
      const { data: portfolioData, error: pError } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false })
      if (pError) throw pError
      setPortfolio(portfolioData || [])

      // Inspiration
      const { data: inspirationData, error: iError } = await supabase
        .from('inspiration_items')
        .select('*')
        .order('created_at', { ascending: false })
      if (iError) throw iError
      setInspiration(inspirationData || [])
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  // Auto-dismiss alert messages
  useEffect(() => {
    if (successMsg || errorMsg) {
      const timer = setTimeout(() => {
        setSuccessMsg(null)
        setErrorMsg(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMsg, errorMsg])

  // --- BOOKING ACTIONS ---
  const updateBookingStatus = async (id: string, newStatus: 'pending' | 'reviewed' | 'archived') => {
    setActionLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      const { error } = await supabase
        .from('booking_requests')
        .update({ status: newStatus })
        .eq('id', id)

      if (error) throw error
      setSuccessMsg(`Booking status updated to ${newStatus}.`)
      
      // Update local state
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
      )
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update booking status.')
    } finally {
      setActionLoading(false)
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this booking request?')) return
    setActionLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      const { error } = await supabase
        .from('booking_requests')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccessMsg('Booking request successfully deleted.')
      setBookings(prev => prev.filter(b => b.id !== id))
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete booking.')
    } finally {
      setActionLoading(false)
    }
  }

  // --- PORTFOLIO ACTIONS ---
  const resetPortfolioForm = () => {
    setEditingPortfolioId(null)
    setPortfolioTitle('')
    setPortfolioImageUrl('')
    setPortfolioCategory('Realism')
    setPortfolioDescription('')
  }

  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id)
    setPortfolioTitle(item.title)
    setPortfolioImageUrl(item.image_url)
    setPortfolioCategory(item.category)
    setPortfolioDescription(item.description || '')
    // Scroll to form nicely
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  const savePortfolioItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!portfolioTitle || !portfolioImageUrl || !portfolioCategory) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    setActionLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      if (editingPortfolioId) {
        // Update existing item
        const { error } = await supabase
          .from('portfolio_items')
          .update({
            title: portfolioTitle,
            image_url: portfolioImageUrl,
            category: portfolioCategory,
            description: portfolioDescription,
          })
          .eq('id', editingPortfolioId)

        if (error) throw error
        setSuccessMsg('Portfolio item updated successfully.')
      } else {
        // Create new item
        const { error } = await supabase
          .from('portfolio_items')
          .insert({
            title: portfolioTitle,
            image_url: portfolioImageUrl,
            category: portfolioCategory,
            description: portfolioDescription,
          })

        if (error) throw error
        setSuccessMsg('New portfolio item added successfully.')
      }

      resetPortfolioForm()
      // Refresh the portfolio list
      const { data: freshPortfolio } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('created_at', { ascending: false })
      setPortfolio(freshPortfolio || [])
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save portfolio item.')
    } finally {
      setActionLoading(false)
    }
  }

  const deletePortfolioItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this portfolio item?')) return
    setActionLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccessMsg('Portfolio item deleted.')
      setPortfolio(prev => prev.filter(p => p.id !== id))
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete portfolio item.')
    } finally {
      setActionLoading(false)
    }
  }

  // --- INSPIRATION ACTIONS ---
  const resetInspirationForm = () => {
    setEditingInspirationId(null)
    setInspirationTitle('')
    setInspirationImageUrl('')
    setInspirationStatus('available')
    setInspirationStyleTag('')
  }

  const handleEditInspiration = (item: InspirationItem) => {
    setEditingInspirationId(item.id)
    setInspirationTitle(item.title)
    setInspirationImageUrl(item.image_url)
    setInspirationStatus(item.status)
    setInspirationStyleTag(item.style_tag || '')
    window.scrollTo({ top: 350, behavior: 'smooth' })
  }

  const saveInspirationItem = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inspirationTitle || !inspirationImageUrl || !inspirationStatus) {
      setErrorMsg('Please fill in all required fields.')
      return
    }

    setActionLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)

    try {
      if (editingInspirationId) {
        // Update
        const { error } = await supabase
          .from('inspiration_items')
          .update({
            title: inspirationTitle,
            image_url: inspirationImageUrl,
            status: inspirationStatus,
            style_tag: inspirationStyleTag,
          })
          .eq('id', editingInspirationId)

        if (error) throw error
        setSuccessMsg('Flash design updated successfully.')
      } else {
        // Insert
        const { error } = await supabase
          .from('inspiration_items')
          .insert({
            title: inspirationTitle,
            image_url: inspirationImageUrl,
            status: inspirationStatus,
            style_tag: inspirationStyleTag,
          })

        if (error) throw error
        setSuccessMsg('New flash design added successfully.')
      }

      resetInspirationForm()
      // Refresh list
      const { data: freshInspiration } = await supabase
        .from('inspiration_items')
        .select('*')
        .order('created_at', { ascending: false })
      setInspiration(freshInspiration || [])
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save flash design.')
    } finally {
      setActionLoading(false)
    }
  }

  const deleteInspirationItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flash design?')) return
    setActionLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)
    try {
      const { error } = await supabase
        .from('inspiration_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccessMsg('Flash design deleted.')
      setInspiration(prev => prev.filter(i => i.id !== id))
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to delete flash design.')
    } finally {
      setActionLoading(false)
    }
  }

  // Statistics calculation
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter(b => b.status === 'pending').length
  const totalPortfolio = portfolio.length
  const availableFlash = inspiration.filter(i => i.status === 'available').length

  // Filter bookings based on selected filter
  const filteredBookings = bookings.filter(b => {
    if (bookingFilter === 'all') return true
    return b.status === bookingFilter
  })

  return (
    <div className="min-h-screen bg-[#121212] text-[#F5F5F5] font-sans antialiased">
      {/* Top Navigation Bar */}
      <nav className="border-b border-[#D4AF37]/20 bg-[#1E1E1E] px-4 py-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-black font-extrabold text-xl tracking-wider">
              JL
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-wide text-white uppercase">
                Jake Llewellyn
              </h1>
              <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                Studio Owner Dashboard
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded border border-[#D4AF37]/40 px-4 py-2 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-black"
            >
              ← Back to Live Site
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Banner Alert Messages */}
        {errorMsg && (
          <div className="mb-6 rounded-lg border-l-4 border-red-500 bg-red-950/40 p-4 text-red-200 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{errorMsg}</span>
              <button onClick={() => setErrorMsg(null)} className="text-red-400 hover:text-white">
                ✕
              </button>
            </div>
          </div>
        )}
        {successMsg && (
          <div className="mb-6 rounded-lg border-l-4 border-green-500 bg-green-950/40 p-4 text-green-200 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{successMsg}</span>
              <button onClick={() => setSuccessMsg(null)} className="text-green-400 hover:text-white">
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Overview Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#1E1E1E] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
              Pending Requests
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#D4AF37]">
                {loading ? '...' : pendingBookings}
              </span>
              <span className="rounded bg-yellow-500/10 px-2.5 py-0.5 text-xs font-semibold text-yellow-500">
                Action Required
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#1E1E1E] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
              Total Consultations
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">
                {loading ? '...' : totalBookings}
              </span>
              <span className="text-xs text-[#A0A0A0]">All-time submissions</span>
            </div>
          </div>

          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#1E1E1E] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
              Portfolio Masterpieces
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-white">
                {loading ? '...' : totalPortfolio}
              </span>
              <span className="text-xs text-[#D4AF37]">Live gallery items</span>
            </div>
          </div>

          <div className="rounded-lg border border-[#D4AF37]/10 bg-[#1E1E1E] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#A0A0A0]">
              Available Flash Art
            </p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-[#16A34A]">
                {loading ? '...' : availableFlash}
              </span>
              <span className="text-xs text-[#A0A0A0]">Claimable designs</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8 border-b border-zinc-800">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab('bookings')
                resetPortfolioForm()
                resetInspirationForm()
              }}
              className={`border-b-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'bookings'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-[#A0A0A0] hover:text-white'
              }`}
            >
              Consultations ({bookings.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('portfolio')
                resetInspirationForm()
              }}
              className={`border-b-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'portfolio'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-[#A0A0A0] hover:text-white'
              }`}
            >
              Portfolio Gallery ({portfolio.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('inspiration')
                resetPortfolioForm()
              }}
              className={`border-b-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                activeTab === 'inspiration'
                  ? 'border-[#D4AF37] text-[#D4AF37]'
                  : 'border-transparent text-[#A0A0A0] hover:text-white'
              }`}
            >
              Flash & Concepts ({inspiration.length})
            </button>
          </div>
        </div>

        {/* TAB 1: CONSULTATIONS & BOOKING REQUESTS */}
        {activeTab === 'bookings' && (
          <div>
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">
                  Booking & Consultation Requests
                </h2>
                <p className="text-sm text-[#A0A0A0]">
                  Review client submissions, manage response statuses, and inspect design references.
                </p>
              </div>

              {/* Status Filter Row */}
              <div className="flex flex-wrap gap-1 rounded-lg bg-[#1E1E1E] p-1 border border-zinc-800">
                {(['all', 'pending', 'reviewed', 'archived'] as const).map(status => (
                  <button
                    key={status}
                    onClick={() => setBookingFilter(status)}
                    className={`rounded px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition ${
                      bookingFilter === status
                        ? 'bg-[#D4AF37] text-black'
                        : 'text-[#A0A0A0] hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex h-48 items-center justify-center rounded-lg bg-[#1E1E1E] border border-zinc-800">
                <span className="text-sm text-[#A0A0A0]">Loading consultation requests...</span>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="flex h-48 flex-col items-center justify-center rounded-lg bg-[#1E1E1E] border border-zinc-800 p-6 text-center">
                <p className="text-lg font-semibold text-white">No requests found</p>
                <p className="text-sm text-[#A0A0A0] mt-1">
                  There are no bookings matching the selected status filter.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredBookings.map(b => (
                  <div
                    key={b.id}
                    className="overflow-hidden rounded-lg border border-zinc-800 bg-[#1E1E1E] transition hover:border-[#D4AF37]/30"
                  >
                    {/* Header Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800 bg-zinc-900/60 px-6 py-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-white">{b.client_name}</h3>
                          {b.is_coverup && (
                            <span className="rounded bg-red-500/10 px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-red-500 border border-red-500/20">
                              Cover-Up
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#A0A0A0] mt-1">
                          Submitted on {new Date(b.created_at).toLocaleDateString('en-GB')}
                        </p>
                      </div>

                      {/* Status and Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Current Status Badge */}
                        <span
                          className={`rounded px-2.5 py-1 text-xs font-extrabold uppercase tracking-wider ${
                            b.status === 'pending'
                              ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                              : b.status === 'reviewed'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {b.status}
                        </span>

                        {/* Status Switchers */}
                        <div className="flex items-center gap-1 bg-black/40 p-1 rounded border border-zinc-800">
                          <button
                            onClick={() => updateBookingStatus(b.id, 'pending')}
                            disabled={actionLoading || b.status === 'pending'}
                            className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-500 hover:bg-yellow-500/10 disabled:opacity-50"
                          >
                            Set Pending
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, 'reviewed')}
                            disabled={actionLoading || b.status === 'reviewed'}
                            className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:bg-blue-400/10 disabled:opacity-50"
                          >
                            Set Reviewed
                          </button>
                          <button
                            onClick={() => updateBookingStatus(b.id, 'archived')}
                            disabled={actionLoading || b.status === 'archived'}
                            className="rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:bg-zinc-800 disabled:opacity-50"
                          >
                            Archive
                          </button>
                        </div>

                        {/* Delete Button */}
                        <button
                          onClick={() => deleteBooking(b.id)}
                          disabled={actionLoading}
                          className="rounded bg-red-950/40 border border-red-900/30 p-2 text-red-400 hover:bg-red-900 hover:text-white transition disabled:opacity-50"
                          title="Delete Request"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                      {/* Left: Contact & Specifications */}
                      <div className="space-y-4 lg:col-span-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <span className="text-xs uppercase tracking-wider text-[#A0A0A0] block">
                              Email Address
                            </span>
                            <a
                              href={`mailto:${b.client_email}`}
                              className="text-sm font-semibold text-[#D4AF37] hover:underline"
                            >
                              {b.client_email}
                            </a>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-[#A0A0A0] block">
                              Phone Number
                            </span>
                            <a
                              href={`tel:${b.client_phone}`}
                              className="text-sm font-semibold text-white hover:underline"
                            >
                              {b.client_phone}
                            </a>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-[#A0A0A0] block">
                              Placement & Dimensions
                            </span>
                            <p className="text-sm font-semibold text-white">
                              {b.placement} ({b.approx_size})
                            </p>
                          </div>
                          <div>
                            <span className="text-xs uppercase tracking-wider text-[#A0A0A0] block">
                              Preferred Days
                            </span>
                            <p className="text-sm font-semibold text-[#D4AF37]">
                              {b.preferred_days && b.preferred_days.length > 0
                                ? b.preferred_days.join(', ')
                                : 'No preference'}
                            </p>
                          </div>
                        </div>

                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#A0A0A0] block mb-1">
                            Project Concept Details
                          </span>
                          <div className="rounded bg-black/30 p-4 border border-zinc-800/80 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">
                            {b.description}
                          </div>
                        </div>
                      </div>

                      {/* Right: Reference Image */}
                      <div className="border-t lg:border-t-0 lg:border-l border-zinc-800 pt-6 lg:pt-0 lg:pl-6 flex flex-col justify-between">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-[#A0A0A0] block mb-2">
                            Reference Image
                          </span>
                          {b.reference_image_url ? (
                            <div className="relative aspect-video w-full overflow-hidden rounded bg-black border border-zinc-800 group">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={b.reference_image_url}
                                alt="Client reference upload"
                                className="h-full w-full object-contain transition group-hover:scale-105"
                              />
                              <div className="absolute inset-x-0 bottom-0 bg-black/75 p-2 text-center opacity-0 group-hover:opacity-100 transition duration-200">
                                <a
                                  href={b.reference_image_url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-[#D4AF37] hover:underline"
                                >
                                  Open full-res link ↗
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="flex h-32 items-center justify-center rounded bg-zinc-900 border border-zinc-800/60 text-xs text-zinc-500">
                              No reference image uploaded
                            </div>
                          )}
                        </div>

                        <div className="mt-4 pt-4 border-t border-zinc-800/40">
                          <a
                            href={`mailto:${b.client_email}?subject=Jake Llewellyn Tattoo Consultation - ${b.client_name}`}
                            className="inline-flex w-full items-center justify-center gap-2 rounded bg-[#D4AF37] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white"
                          >
                            ✉ Send Response Email
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PORTFOLIO GALLERY MANAGER */}
        {activeTab === 'portfolio' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: List & Manage */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">
                  Portfolio Gallery Master List
                </h2>
                <p className="text-sm text-[#A0A0A0]">
                  Add, edit, or delete items displayed on the live Virtual Portfolio page.
                </p>
              </div>

              {loading ? (
                <p className="text-zinc-500">Loading portfolio items...</p>
              ) : portfolio.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-[#1E1E1E] p-12 text-center">
                  <p className="text-zinc-400">No portfolio items in the database.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {portfolio.map(item => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-zinc-800 bg-[#1E1E1E] overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-video w-full bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute top-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] border border-[#D4AF37]/20">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <h4 className="font-extrabold text-white tracking-wide uppercase line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#A0A0A0] mt-1 line-clamp-2">
                            {item.description || 'No description provided.'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
                          <button
                            onClick={() => handleEditPortfolio(item)}
                            className="flex-1 rounded bg-zinc-800 text-xs font-bold uppercase tracking-wider py-2 text-white hover:bg-zinc-700 transition"
                          >
                            Edit Details
                          </button>
                          <button
                            onClick={() => deletePortfolioItem(item.id)}
                            className="rounded bg-red-950/40 border border-red-900/30 px-3 py-2 text-red-400 hover:bg-red-900 hover:text-white transition"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Add / Edit Form */}
            <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1E1E1E] p-6 h-fit sticky top-6">
              <h3 className="text-lg font-extrabold tracking-wide text-white uppercase mb-4">
                {editingPortfolioId ? '⚡ Edit Portfolio Item' : '✨ Add New Portfolio Piece'}
              </h3>

              <form onSubmit={savePortfolioItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Tattoo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Realism Lion Portrait"
                    value={portfolioTitle}
                    onChange={e => setPortfolioTitle(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={portfolioImageUrl}
                    onChange={e => setPortfolioImageUrl(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Provide a link to a high-resolution image hosted on a secure provider.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Category Style *
                  </label>
                  <select
                    value={portfolioCategory}
                    onChange={e => setPortfolioCategory(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="Realism">Realism</option>
                    <option value="Black & Grey">Black & Grey</option>
                    <option value="Color">Color</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Fine Line">Fine Line</option>
                    <option value="Cover-ups">Cover-ups</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Description & Session Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Mention placement, hours taken, needle sizes, or skin integration details..."
                    value={portfolioDescription}
                    onChange={e => setPortfolioDescription(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 rounded bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white disabled:opacity-50"
                  >
                    {editingPortfolioId ? 'Save Changes' : 'Publish Item'}
                  </button>
                  {editingPortfolioId && (
                    <button
                      type="button"
                      onClick={resetPortfolioForm}
                      className="rounded bg-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: STYLE INSPIRATION (FLASH ART) */}
        {activeTab === 'inspiration' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: List */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-extrabold tracking-tight text-white uppercase">
                  Available Flash & Style Concepts
                </h2>
                <p className="text-sm text-[#A0A0A0]">
                  Manage pre-drawn designs. Flag them as Available or Adopted for prospective clients.
                </p>
              </div>

              {loading ? (
                <p className="text-zinc-500">Loading flash items...</p>
              ) : inspiration.length === 0 ? (
                <div className="rounded-lg border border-zinc-800 bg-[#1E1E1E] p-12 text-center">
                  <p className="text-zinc-400">No flash art in the database yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {inspiration.map(item => (
                    <div
                      key={item.id}
                      className="rounded-lg border border-zinc-800 bg-[#1E1E1E] overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-square w-full bg-black">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="h-full w-full object-contain p-2"
                        />
                        <span
                          className={`absolute top-2 right-2 rounded px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider border ${
                            item.status === 'available'
                              ? 'bg-green-500/10 text-green-400 border-green-500/25'
                              : 'bg-zinc-800 text-zinc-400 border-zinc-700'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                        <div>
                          <h4 className="font-extrabold text-white tracking-wide uppercase line-clamp-1">
                            {item.title}
                          </h4>
                          {item.style_tag && (
                            <span className="inline-block mt-1 text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                              🏷️ {item.style_tag}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 pt-3 border-t border-zinc-800">
                          <button
                            onClick={() => handleEditInspiration(item)}
                            className="flex-1 rounded bg-zinc-800 text-xs font-bold uppercase tracking-wider py-2 text-white hover:bg-zinc-700 transition"
                          >
                            Edit Status/Details
                          </button>
                          <button
                            onClick={() => deleteInspirationItem(item.id)}
                            className="rounded bg-red-950/40 border border-red-900/30 px-3 py-2 text-red-400 hover:bg-red-900 hover:text-white transition"
                            title="Delete"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Form */}
            <div className="rounded-lg border border-[#D4AF37]/20 bg-[#1E1E1E] p-6 h-fit sticky top-6">
              <h3 className="text-lg font-extrabold tracking-wide text-white uppercase mb-4">
                {editingInspirationId ? '⚡ Edit Flash Design' : '✨ Add New Flash Art'}
              </h3>

              <form onSubmit={saveInspirationItem} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Design Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Ivy Dagger"
                    value={inspirationTitle}
                    onChange={e => setInspirationTitle(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Image URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://images.unsplash.com/..."
                    value={inspirationImageUrl}
                    onChange={e => setInspirationImageUrl(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    A clean image of your hand-drawn sketch or digital concept.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Style Tags
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fine Line / Dotwork"
                    value={inspirationStyleTag}
                    onChange={e => setInspirationStyleTag(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-800 px-3 py-2 text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A0A0A0] mb-1">
                    Status *
                  </label>
                  <div className="mt-2 flex gap-4">
                    <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="available"
                        checked={inspirationStatus === 'available'}
                        onChange={() => setInspirationStatus('available')}
                        className="text-[#D4AF37] focus:ring-0 focus:ring-offset-0 bg-black border-zinc-800"
                      />
                      <span>Available</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value="adopted"
                        checked={inspirationStatus === 'adopted'}
                        onChange={() => setInspirationStatus('adopted')}
                        className="text-[#D4AF37] focus:ring-0 focus:ring-offset-0 bg-black border-zinc-800"
                      />
                      <span>Adopted</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="flex-1 rounded bg-[#D4AF37] px-4 py-2 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-white disabled:opacity-50"
                  >
                    {editingInspirationId ? 'Save Changes' : 'Publish Design'}
                  </button>
                  {editingInspirationId && (
                    <button
                      type="button"
                      onClick={resetInspirationForm}
                      className="rounded bg-zinc-800 px-3 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-zinc-800 bg-[#1E1E1E] mt-16 py-8 px-4 text-center text-xs text-[#A0A0A0]">
        <p className="tracking-wide">
          &copy; 2025 Tattoos by Jake Llewellyn. Studio Owner Administrative Portal. All rights reserved.
        </p>
      </footer>
    </div>
  )
}