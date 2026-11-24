'use client';

import React, { useRef } from 'react';
import { Carousel } from '@/lib/api';

interface CarouselsRailProps {
  carousels: Carousel[];
  onSelectCarousel?: (carousel: Carousel) => void;
}

export default function CarouselsRail({ carousels, onSelectCarousel }: CarouselsRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: direction === 'left' ? -340 : 340, behavior: 'smooth' });
    }
  };

  return (
    <section className="section" id="carousels">
      <div className="sechead">
        <a style={{ display: 'contents' }} href="#carousels">
          <h3>Carousels</h3>
          <span className="cv">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </a>
        <div className="sp"></div>
        <span className="cnt mono">SLIDES</span>
        <span className="rnav" style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
          <button type="button" aria-label="Previous" onClick={() => scroll('left')}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
          </button>
          <button type="button" aria-label="Next" onClick={() => scroll('right')}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </span>
      </div>

      <div className="rail" ref={railRef} style={{ gap: '16px' }}>
        {carousels.map((c) => (
          <div
            key={c.id}
            tabIndex={0}
            role="button"
            onClick={() => onSelectCarousel && onSelectCarousel(c)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCarousel && onSelectCarousel(c);
              }
            }}
            className="cursor-pointer group flex flex-col flex-shrink-0 focus:outline-none"
            style={{ width: '240px' }}
          >
            {/* Slide Cover Image (4:5 Aspect Ratio matching Image 1) */}
            <div 
              className="relative w-full rounded-xl overflow-hidden bg-[#17110c] border border-white/10 group-hover:border-[#f9bf43]/60 group-focus-visible:ring-2 group-focus-visible:ring-[#f9bf43] group-focus-visible:border-transparent transition-all shadow-md group-hover:scale-[1.02] duration-200"
              style={{ aspectRatio: '4/5' }}
            >
              <img
                src={c.image}
                alt={c.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom Label Info (matching Image 1) */}
            <div className="pt-2.5">
              <h4 
                className="text-sm font-bold text-white group-hover:text-[#f9bf43] transition line-clamp-1 m-0"
                title={c.title}
              >
                {c.title}
              </h4>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#f8f0e473] mt-1">
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <rect x="7" y="7" width="10" height="10"></rect>
                </svg>
                <span>{c.slideCount || 9} slides</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
