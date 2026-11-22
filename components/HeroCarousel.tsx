'use client';

import React, { useState, useEffect } from 'react';
import { HeroStory } from '@/lib/api';

interface HeroCarouselProps {
  stories: HeroStory[];
  onSelectStory: (story: HeroStory) => void;
}

export default function HeroCarousel({ stories, onSelectStory }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevStory = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation & auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const current = stories[currentIndex] || stories[0];

  return (
    <div className="hero" id="hero">
      <div id="hlayers">
        {stories.map((story, idx) => (
          <div 
            key={story.id} 
            className={`hlayer ${idx === currentIndex ? 'on' : ''}`}
            style={{
              opacity: idx === currentIndex ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              position: 'absolute',
              inset: 0
            }}
          >
            <div className="im gr grain">
              <img
                src={story.image}
                alt={story.title}
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  objectFit: 'cover'
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="htop">
        <div className="hswipe">
          <div className="hwide"></div>
        </div>
      </div>

      {/* Navigation Arrows positioned at bottom right */}
      <div className="hnav">
        <button 
          type="button" 
          onClick={prevStory}
          className="harr prev" 
          aria-label="Previous story"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M15 5l-7 7 7 7"></path>
          </svg>
        </button>
        <button 
          type="button" 
          onClick={nextStory}
          className="harr next" 
          aria-label="Next story"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>

      <div className="hcopy">
        <div className="hslot" id="hslot">
          <div className="hitem on" style={{ opacity: 1 }}>
            <span className="hchips">
              <span className="chip mono">{current.tag}</span>
            </span>

            <h2 title={current.title}>
              {current.title}
            </h2>

            <div className="meta mono" title={current.excerpt}>
              {current.excerpt}
            </div>

            <div className="rank"></div>

            <div className="hcta">
              <button 
                type="button" 
                onClick={() => onSelectStory(current)} 
                className="btn"
                style={{ cursor: 'pointer' }}
              >
                Read
              </button>
            </div>
          </div>
        </div>

        {/* Authentic Timeline Scrubber Dots matching original foundingmena.com */}
        <div 
          className="dots" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            paddingTop: '12px' 
          }}
        >
          {stories.map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  height: '20px',
                  padding: '0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  width: isActive ? '34px' : '28px',
                  transition: 'width 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
              >
                {isActive ? (
                  // Active state: golden-amber glowing pill matching 0bd817f1.png
                  <span
                    style={{
                      width: '100%',
                      height: '5px',
                      borderRadius: '999px',
                      background: '#e09410',
                      backgroundImage: 'linear-gradient(135deg, #f9bf43 0%, #e09410 100%)',
                      boxShadow: '0 0 8px rgba(249, 191, 67, 0.45)',
                      display: 'block',
                      transition: 'all 0.35s ease'
                    }}
                  />
                ) : (
                  // Inactive state: connected track line with center bead dot matching 0bd817f1.png
                  <span
                    style={{
                      width: '100%',
                      height: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                  >
                    {/* Connecting line */}
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'rgba(255, 255, 255, 0.25)',
                        borderRadius: '1px'
                      }}
                    />
                    {/* Center bead dot */}
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.55)',
                        position: 'relative',
                        zIndex: 1,
                        transition: 'background 0.2s ease, transform 0.2s ease'
                      }}
                    />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
