'use client';

import React, { useRef } from 'react';
import { Startup } from '@/lib/api';

interface StartupsRailProps {
  startups: Startup[];
  onSelectStartup: (startup: Startup) => void;
}

export default function StartupsRail({ startups, onSelectStartup }: StartupsRailProps) {
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
    <section className="section" id="the-30">
      <div className="sechead">
        <a style={{ display: 'contents' }} href="#the-30">
          <h3>MENA’s Founding 30: Startups</h3>
          <span className="cv">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </a>
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
        {startups.map((startup, idx) => {
          const crestNumber = startup.rank || idx + 1;
          const crestPath = `/crest/company-house-${crestNumber <= 30 ? crestNumber : 1}.svg`;

          return (
            <div
              key={startup.id}
              className="fm stp full inkdark"
              data-tilt=""
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                // @ts-ignore
                '--brand': startup.brandColor || '#6af990',
                cursor: 'pointer',
                transition: 'transform 0.15s ease-out, box-shadow 0.15s ease-out'
              }}
              onClick={() => onSelectStartup(startup)}
            >
              <div className="panel sq">
                <span
                  className="gg"
                  data-bright="1"
                  data-live="1"
                  style={{
                    backgroundImage: `url(${startup.groundBg})`,
                    backgroundColor: startup.brandColor,
                    // @ts-ignore
                    '--gtint': startup.groundTint || startup.brandColor,
                    '--gfall': startup.groundTint || startup.brandColor
                  }}
                  aria-hidden="true"
                ></span>

                {/* Center SVG Logo */}
                <div className="markwrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bm fit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {startup.markSvg ? (
                      <span className="fmk" style={{ width: '60%', height: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img 
                          src={startup.markSvg} 
                          alt={startup.name}
                          style={{ maxWidth: '85%', maxHeight: '85%', objectFit: 'contain' }}
                          loading="lazy"
                        />
                      </span>
                    ) : (
                      <span style={{ fontSize: '38px', fontWeight: 900, color: '#ffffff' }}>
                        {startup.name}
                      </span>
                    )}
                  </i>
                </div>

                {/* Crest Badge on top-left (01, 02, 03, 04) */}
                <span className="badge" aria-hidden="true" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <figure className="crest" style={{ width: '54px', height: '54px' }}>
                    <div className="crestim" style={{ width: '54px', height: '54px' }}>
                      <img 
                        className="crestsvg" 
                        src={crestPath} 
                        alt={`House ${crestNumber}`} 
                        width="54" 
                        height="54" 
                      />
                    </div>
                  </figure>
                </span>
                <i className="seam"></i>
              </div>

              <div className="plate">
                <div
                  className="fill"
                  style={{ backgroundImage: `url(${startup.groundBg})` }}
                ></div>
                <i className="seam"></i>

                <div className="pin">
                  <div className="chips">
                    {startup.isFeatured && (
                      <span className="chip feat">
                        <i className="fmmark" aria-hidden="true"></i>FM featured
                      </span>
                    )}
                    <span className="chip fm40">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.6" className="ci">
                        <path d="M4 7.5 19.5 6 12.3 19.5 11.7 11.8z"></path>
                      </svg>
                      FM<b>30</b>
                    </span>
                    <span className="chip cty" title={startup.country}>
                      <img className="flg" src={startup.countryFlag} alt="" loading="lazy" />
                      <span className="cl">{startup.country}</span>
                    </span>
                    <span className="chip sector" title={startup.sector}>
                      <i className="sw" style={{ background: 'linear-gradient(18deg,#AA397B,#862D52)' }}></i>
                      <span className="cl">{startup.sector}</span>
                    </span>
                  </div>

                  <h3>{startup.name}</h3>
                  <p className="line">{startup.hook}</p>

                  {/* Valuation Matching Live Site */}
                  <div className="stat">
                    <b>{startup.valuation || '$1.0bn'}</b>
                    <span>Valuation</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
