'use client';

import React, { useRef } from 'react';
import { Short } from '@/lib/api';

interface ShortsRailProps {
  shorts: Short[];
}

export default function ShortsRail({ shorts }: ShortsRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <section className="section" id="watch">
      <div className="sechead">
        <a style={{ display: 'contents' }} href="#watch">
          <h3>Shorts</h3>
          <span className="cv">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </a>
        <div className="sp"></div>
        <span className="cnt mono">Under three minutes</span>
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

      <div className="rail" ref={railRef}>
        {shorts.map((short) => (
          <a
            key={short.id}
            className="c in w-v shortc"
            href={short.href}
            style={{
              width: '240px',
              height: '380px',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '16px',
              background: '#17110c',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              textDecoration: 'none'
            }}
          >
            <div className="im gr" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img
                src={short.image}
                alt={short.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(16,12,8,0.95) 0%, rgba(16,12,8,0.3) 50%, transparent 100%)'
                }}
              ></div>
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                <span className="chip mono" style={{ fontSize: '10px', padding: '2px 6px', background: '#f9bf43', color: '#100c08', fontWeight: 'bold' }}>
                  {short.dur || 'SHORT'}
                </span>
                <span className="chip" style={{ fontSize: '10px', padding: '2px 6px' }}>
                  {short.sector}
                </span>
              </div>
              <h4 style={{ color: '#fff3e0', fontSize: '15px', fontWeight: 'bold', margin: '0 0 4px', lineHeight: 1.25 }}>
                {short.title}
              </h4>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
                {short.country}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
