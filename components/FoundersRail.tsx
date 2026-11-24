'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { Founder } from '@/lib/api';

interface FoundersRailProps {
  founders: Founder[];
  onSelectFounder?: (founder: Founder) => void;
}

export default function FoundersRail({ founders, onSelectFounder }: FoundersRailProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (railRef.current) {
      railRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <section className="section" id="the-30-founders">
      <div className="sechead">
        <Link style={{ display: 'contents' }} href="/the-30/founders">
          <h3>MENA’s Founding 30: Founders</h3>
          <span className="cv">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </Link>
        <div className="sp"></div>
        <span className="seeall" style={{ cursor: 'pointer' }}>
          See all
        </span>
        <span className="rnav" style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
          <button 
            type="button" 
            aria-label="Previous" 
            onClick={scrollLeft}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px',
              color: '#fff3e0',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M15 5l-7 7 7 7"></path>
            </svg>
          </button>
          <button 
            type="button" 
            aria-label="Next" 
            onClick={scrollRight}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px',
              color: '#fff3e0',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </span>
      </div>

      <div className="rail" ref={railRef}>
        {founders.map((founder) => (
          <div
            key={founder.id}
            className="fm fnd full"
            data-tilt=""
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => onSelectFounder && onSelectFounder(founder)}
            style={{
              // @ts-ignore
              '--brand': founder.brandColor || '#A8401A',
              cursor: 'pointer',
              transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out'
            }}
          >
            <div className="panel">
              <span
                className="gg sun"
                data-bright="1"
                data-live="1"
                style={{
                  backgroundImage: `url(${founder.groundBg})`,
                  backgroundColor: '#A8401A',
                  // @ts-ignore
                  '--gtint': '#A8401A',
                  '--gfall': '#A8401A'
                }}
                aria-hidden="true"
              ></span>

              <span className="thirty" aria-hidden="true">
                30
              </span>

              <img
                alt={founder.name}
                loading="lazy"
                className="cutout"
                src={founder.cutoutImg}
                style={{
                  height: '115.0%',
                  top: '-2.8%',
                  bottom: 'auto',
                  transform: 'translateX(-51.5%)',
                  objectFit: 'contain'
                }}
              />
              <i className="seam"></i>
            </div>

            <div className="plate">
              <div
                className="fill"
                style={{ backgroundImage: `url(${founder.groundBg})` }}
              ></div>
              <i className="seam"></i>

              <div className="pin">
                <div className="chips">
                  <span className="chip fm40">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" className="ci">
                      <path d="M4 7.5 19.5 6 12.3 19.5 11.7 11.8z"></path>
                    </svg>
                    FM<b>30</b>
                  </span>
                  <span className="chip cty" title={founder.country}>
                    <img className="flg" src={founder.countryFlag} alt="" loading="lazy" />
                    <span className="cl">{founder.country}</span>
                  </span>
                  <span className="chip sector" title={founder.sector}>
                    <i className="sw" style={{ background: 'linear-gradient(87deg,#416C6F,#35515B)' }}></i>
                    <span className="cl">{founder.sector}</span>
                  </span>
                </div>

                <h3>{founder.name}</h3>

                <div className="row" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '8px 0' }}>
                  <span 
                    className="ltile lchip co" 
                    style={{ 
                      background: founder.companyTint || founder.brandColor || '#7D3C98', 
                      width: '24px', 
                      height: '24px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      borderRadius: '5px', 
                      color: '#fff', 
                      fontSize: '11px', 
                      fontWeight: 'bold',
                      position: 'relative',
                      flexShrink: 0
                    }}
                  >
                    <svg className="ltd" aria-hidden="true" viewBox="0 0 30 30" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                      <rect x="0.75" y="0.75" width="28.5" height="28.5" rx="6.45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.5 2.65" strokeDashoffset="3.74"></rect>
                    </svg>
                    <b className="ltg">{founder.companyLetter || (founder.company ? founder.company[0] : 'F')}</b>
                  </span>
                  <div className="who" style={{ display: 'flex', flexDirection: 'column', fontSize: '11px' }}>
                    <b style={{ color: '#fff3e0' }}>{founder.role}</b>
                    <span style={{ color: 'rgba(255,255,255,0.6)' }}>{founder.company}</span>
                  </div>
                </div>

                <p className="hook">{founder.hook}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
