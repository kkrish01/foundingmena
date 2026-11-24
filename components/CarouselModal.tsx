'use client';

import React, { useEffect, useState } from 'react';
import { Carousel, Article } from '@/lib/api';
import Footer from '@/components/Footer';

interface CarouselModalProps {
  carousel: Carousel | null;
  onClose: () => void;
  onSelectCarousel: (carousel: Carousel) => void;
  allCarousels: Carousel[];
  articles: Article[];
}

export default function CarouselModal({
  carousel,
  onClose,
  onSelectCarousel,
  allCarousels,
  articles
}: CarouselModalProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Lock body & html scroll while modal is active
  useEffect(() => {
    if (carousel) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [carousel]);

  // Reset to slide 0 when active carousel changes
  useEffect(() => {
    setCurrentSlideIndex(0);
    setIsAutoPlaying(true);
  }, [carousel]);

  // Automatic slide rotation (every 4.5 seconds)
  useEffect(() => {
    if (!carousel || !isAutoPlaying || !carousel.slides || carousel.slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % carousel.slides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [carousel, isAutoPlaying]);

  if (!carousel) return null;

  const slides = carousel.slides && carousel.slides.length > 0 ? carousel.slides : [carousel.image];
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Other carousels for "More Carousels" rail
  const otherCarousels = allCarousels.filter((c) => c.id !== carousel.id);

  return (
    <div 
      className="startup-modal-container animate-fadeIn"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Top Fixed Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#100c08]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between w-full" style={{ height: '64px' }}>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-white/80 hover:text-white transition px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold cursor-pointer"
            aria-label="Back"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition cursor-pointer flex items-center justify-center"
              aria-label="Share"
              title="Share"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="butt" strokeLinejoin="miter">
                <path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition cursor-pointer flex items-center justify-center"
              aria-label="Close"
              title="Close"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Single View Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Slide Deck Viewer (matching Image 2) */}
        <div 
          className="relative max-w-[460px] mx-auto mb-10"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Active Slide Image */}
          <div 
            className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-[#17110c] border border-white/15"
            style={{ aspectRatio: '4/5' }}
          >
            <img
              src={slides[currentSlideIndex]}
              alt={`${carousel.title} - Slide ${currentSlideIndex + 1}`}
              className="w-full h-full object-cover select-none transition-all duration-300"
            />
          </div>

          {/* Floating Left & Right Navigation Arrows */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute -left-5 sm:-left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-md shadow-lg"
            aria-label="Previous Slide"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute -right-5 sm:-right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-md shadow-lg"
            aria-label="Next Slide"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          {/* Slide Dots and Index (matching Image 2: "••••••• 1 / 9") */}
          <div className="flex items-center justify-between mt-4 px-2">
            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlideIndex 
                      ? 'w-5 bg-[#f9bf43]' 
                      : 'w-2 bg-white/25 hover:bg-white/50'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Slide Count Index */}
            <div className="text-xs font-mono font-medium text-[#f8f0e4aa]">
              {currentSlideIndex + 1} / {totalSlides}
            </div>
          </div>
        </div>

        {/* Carousel Metadata & Editorial Section (matching Image 2) */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/10 text-[#f8f0e4] font-mono border border-white/15">
              CAROUSEL
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
            {carousel.title}
          </h1>

          <div className="text-xs font-mono text-[#f8f0e4aa] mt-1.5 mb-3 uppercase tracking-wider">
            {carousel.byline || 'FM DESK'} · {carousel.date || '28 SEP 2026'} · {totalSlides} SLIDES
          </div>

          {/* Tag Chips */}
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {carousel.country && (
              <span className="chip cty" style={{ fontSize: '10px', padding: '3px 8px' }}>
                {carousel.countryFlag && <img className="flg" src={carousel.countryFlag} alt="" />}
                <span>{carousel.country}</span>
              </span>
            )}
            {carousel.sector && (
              <span className="chip sector" style={{ fontSize: '10px', padding: '3px 8px' }}>
                <span>{carousel.sector}</span>
              </span>
            )}
            {carousel.tags && carousel.tags.map((tag: string, idx: number) => (
              <span 
                key={idx}
                className="chip mono" 
                style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(255,255,255,0.08)' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm sm:text-base text-[#f8f0e4cc] leading-relaxed max-w-3xl">
            {carousel.description}
          </p>
        </div>

        {/* Section: MORE CAROUSELS (matching Image 2) */}
        <div className="mb-12">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            More carousels
          </h5>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {otherCarousels.map((c) => (
              <div
                key={c.id}
                onClick={() => onSelectCarousel(c)}
                className="w-[180px] flex-shrink-0 cursor-pointer group flex flex-col"
              >
                <div 
                  className="relative w-full rounded-xl overflow-hidden bg-[#17110c] border border-white/10 group-hover:border-[#f9bf43]/60 transition-all shadow-md"
                  style={{ aspectRatio: '4/5' }}
                >
                  <img
                    src={c.image}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="pt-2">
                  <p className="text-xs font-semibold text-white truncate" title={c.title}>
                    {c.title}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#f8f0e473] mt-0.5">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <rect x="7" y="7" width="10" height="10"></rect>
                    </svg>
                    <span>{c.slideCount || 9} slides</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: KEEP PULLING THIS THREAD (matching Image 2) */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold">
              Keep pulling this thread
            </h5>
            <div className="flex items-center gap-1.5">
              <span className="chip cty" style={{ fontSize: '9px', padding: '1px 6px' }}>
                <span>{carousel.country || 'Egypt'}</span>
              </span>
              <span className="chip sector" style={{ fontSize: '9px', padding: '1px 6px' }}>
                <span>{carousel.sector || 'Fintech'}</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((art) => (
              <a
                key={art.id}
                href={art.href}
                className="rounded-xl overflow-hidden border border-white/10 bg-[#17110c] hover:border-white/30 transition flex flex-col text-decoration-none group"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-[#f9bf43] border border-white/15">
                    STORY
                  </span>
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <h6 className="text-sm font-semibold text-white leading-snug group-hover:text-[#f9bf43] transition">
                    {art.title}
                  </h6>
                  <span className="text-[11px] font-mono text-[#f8f0e473] mt-2 block">
                    FOUNDING MENA
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Authentic Footer Component */}
      <Footer />
    </div>
  );
}
