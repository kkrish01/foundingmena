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

        {/* Carousel Slide Indicators */}
        <div className="dots">
          {stories.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`dot ${idx === currentIndex ? 'on' : ''}`}
              aria-label={`Slide ${idx + 1}`}
              style={{
                width: idx === currentIndex ? '24px' : '8px',
                height: '4px',
                borderRadius: '2px',
                backgroundColor: idx === currentIndex ? '#f9bf43' : 'rgba(255,255,255,0.25)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            >
              <i />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
