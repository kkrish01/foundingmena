'use client';

import React, { useRef } from 'react';
import { Article } from '@/lib/api';

interface ArticlesGridProps {
  articles: Article[];
}

export default function ArticlesGrid({ articles }: ArticlesGridProps) {
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
        <span className="cnt mono">Deep dive</span>
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
        {articles.map((art) => (
          <a
            key={art.id}
            className="c in w-v"
            href={art.href}
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '14px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '18px',
              background: '#17110c',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              textDecoration: 'none'
            }}
          >
            <div className="im gr" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <img
                src={art.image}
                alt={art.title}
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
                <span className="chip mono" style={{ fontSize: '10px', padding: '2px 6px', background: 'rgba(255,255,255,0.12)', color: '#fff' }}>
                  {art.tag || 'Story'}
                </span>
                <span className="chip" style={{ fontSize: '10px', padding: '2px 6px' }}>
                  {art.sector}
                </span>
              </div>
              <h4 style={{ color: '#fff3e0', fontSize: '17px', fontWeight: 'bold', margin: '0 0 6px', lineHeight: 1.25 }}>
                {art.title}
              </h4>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                {art.country}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
