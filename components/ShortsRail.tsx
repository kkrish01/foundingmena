'use client';

import React, { useRef, useState } from 'react';
import { Short } from '@/lib/api';

interface ShortsRailProps {
  shorts: Short[];
  onSelectShort?: (short: Short) => void;
}

function ShortCard({ short, onClick }: { short: Short; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoSrc = short.videoUrl
    ? `/api/media?url=${encodeURIComponent(short.videoUrl)}`
    : null;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="c in w-v shortc cursor-pointer group flex flex-col"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: '210px',
        flexShrink: 0,
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#0d0907',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out'
      }}
    >
      {/* 9:16 Video Thumbnail Container */}
      <div 
        className="im gr relative w-full overflow-hidden bg-black" 
        style={{ aspectRatio: '9/16' }}
      >
        <img
          src={short.image}
          alt={short.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200"
          style={{ opacity: isHovered && videoSrc ? 0 : 1 }}
        />

        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            muted
            loop
            preload="none"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-200 pointer-events-none"
            style={{ opacity: isHovered ? 1 : 0 }}
          />
        )}

        {/* Top-Left Short Badge */}
        <span 
          className="chip mono tg"
          style={{
            position: 'absolute',
            top: '8px',
            left: '8px',
            zIndex: 6,
            fontSize: '11px',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'rgba(0,0,0,0.65)',
            color: '#fff',
            backdropFilter: 'blur(4px)',
            border: '1px solid rgba(255,255,255,0.15)'
          }}
        >
          SHORT
        </span>

        {/* Bottom-Right Play Button Icon */}
        <span 
          className="playsm" 
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            zIndex: 6,
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: 'rgba(16,12,8,0.75)',
            border: '1px solid rgba(255,255,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            backdropFilter: 'blur(4px)'
          }}
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <polygon points="6 4 20 12 6 20 6 4"></polygon>
          </svg>
        </span>
      </div>

      {/* Bottom Text Strip Box */}
      <div 
        className="sstrip"
        style={{
          background: '#0d0907',
          padding: '10px 12px',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        <div 
          className="ct font-semibold text-white text-xs truncate" 
          title={short.title}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {short.title}
        </div>
      </div>
    </div>
  );
}

export default function ShortsRail({ shorts, onSelectShort }: ShortsRailProps) {
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
        <span className="cnt mono">UNDER THREE MINUTES</span>
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
        {shorts.map((short) => (
          <ShortCard
            key={short.id}
            short={short}
            onClick={() => onSelectShort && onSelectShort(short)}
          />
        ))}
      </div>
    </section>
  );
}
