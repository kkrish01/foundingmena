'use client';

import React, { useRef } from 'react';
import { Article } from '@/lib/api';

interface ArticlesGridProps {
  articles: Article[];
  onSelectArticle?: (article: Article) => void;
}

export default function ArticlesGrid({ articles, onSelectArticle }: ArticlesGridProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: direction === 'left' ? -360 : 360, behavior: 'smooth' });
    }
  };

  return (
    <section className="section" id="articles">
      <div className="sechead">
        <a style={{ display: 'contents' }} href="#articles">
          <h3>Articles</h3>
          <span className="cv">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </a>
        <div className="sp"></div>
        <span className="seeall" style={{ cursor: 'pointer', fontSize: '13px' }}>
          See all
        </span>
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
        {articles.map((art) => (
          <div
            key={art.id}
            onClick={() => onSelectArticle && onSelectArticle(art)}
            className="cursor-pointer group flex flex-col flex-shrink-0"
            style={{ width: '320px' }}
          >
            {/* Top Visual Container (aspect 16/10) */}
            <div 
              className="relative w-full rounded-t-xl overflow-hidden bg-black border-t border-x border-white/10"
              style={{ aspectRatio: '16/10' }}
            >
              <img
                src={art.image}
                alt={art.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />

              {/* Story Pill Badge on top-left (matching Image 1) */}
              <span 
                className="chip mono tg"
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '10px',
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
                STORY
              </span>
            </div>

            {/* Bottom Content Plate (matching Image 1) */}
            <div 
              className="p-4 rounded-b-xl border border-white/10 bg-[#17110c] flex flex-col justify-between flex-1 group-hover:border-[#f9bf43]/50 transition shadow-md"
              style={{ minHeight: '180px' }}
            >
              <div>
                <h4 
                  className="text-base font-bold text-white group-hover:text-[#f9bf43] transition line-clamp-2 leading-snug mb-2"
                  title={art.title}
                >
                  {art.title}
                </h4>
                <p className="text-xs text-[#f8f0e4aa] line-clamp-2 leading-relaxed mb-4">
                  {art.description}
                </p>
              </div>

              {/* Bottom Meta Row (Date on Left, Sector Chip with Dot on Right) */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-[#f8f0e473] uppercase tracking-wider">
                  {art.date || 'NOV 2026'}
                </span>

                <span 
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#f8f0e4cc]"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f9bf43]"></span>
                  <span>{art.sector}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
