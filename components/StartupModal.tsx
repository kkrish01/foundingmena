'use client';

import React, { useEffect } from 'react';
import { Startup } from '@/lib/api';

interface StartupModalProps {
  startup: Startup | null;
  onClose: () => void;
}

export default function StartupModal({ startup, onClose }: StartupModalProps) {
  // Prevent double scrollbar by locking body & html scroll while modal is active
  useEffect(() => {
    if (startup) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [startup]);

  if (!startup) return null;

  const crestNumber = startup.rank || 1;
  const crestPath = `/crest/company-house-${crestNumber <= 30 ? crestNumber : 1}.svg`;

  // Funding rounds
  const fundingRounds = [
    { year: '2019', stage: 'Seed', amt: '$2m' },
    { year: '2020', stage: 'Seed', amt: '$7m' },
    { year: '2020', stage: 'Series A', amt: '$23m' },
    { year: '2021', stage: 'Series B', amt: '$50m' },
    { year: '2022', stage: 'Series B', amt: '$54m' },
    { year: '2023', stage: 'Series C', amt: '$58m' },
    { year: '2023', stage: 'Series D', amt: '$50m' },
    { year: '2023', stage: 'Series D', amt: '$200m' },
    { year: '2025', stage: 'Series E', amt: '$160m' },
    { year: '2026', stage: 'Series F', amt: '$233m' }
  ];

  const investors = [
    'Blue Pool Capital',
    'Hassana Investment Company',
    'Global Founders Capital',
    'Mubadala Investment Company',
    'PayPal Ventures',
    'STV'
  ];

  const peers = [
    { name: 'MNT-Halan', sector: 'Fintech · #3', bg: '#D35400', mark: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/marks/1fd5cf94-8564-4985-8813-9f8674b86ee3.svg' },
    { name: 'HALA', sector: 'Fintech · #4', bg: '#009877', mark: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/marks/originals/hala-c20250d03e.svg' },
    { name: 'Tamara', sector: 'Fintech · #5', bg: '#602E55', mark: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/marks/originals/tamara-29b88b2f31.svg' },
    { name: 'Foodics', sector: 'Fintech · #6', bg: '#5D6D7E', mark: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/marks/originals/foodics-f6a2e8b93c.svg' },
    { name: 'Rasan', sector: 'Fintech · #7', bg: '#2b580c', mark: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/marks/65d1b972-68cc-41a0-bf94-ed6b64717c02.svg' }
  ];

  return (
    <div 
      className="startup-modal-container animate-fadeIn"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Top Fixed Navigation Bar */}
      <div 
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#100c08]/95 backdrop-blur-md border-b border-white/10"
        style={{ height: '64px' }}
      >
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

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
          {/* Left Column: Full Startup Card (Matching Image 3) */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div 
              className="fm stp full inkdark" 
              style={{ 
                // @ts-ignore
                '--brand': startup.brandColor || '#6af990',
                width: '100%',
                maxWidth: '340px'
              }}
            >
              <div className="panel sq" style={{ position: 'relative' }}>
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
                        />
                      </span>
                    ) : (
                      <span style={{ fontSize: '38px', fontWeight: 900, color: '#ffffff' }}>
                        {startup.name}
                      </span>
                    )}
                  </i>
                </div>

                {/* Crest Badge on top-left */}
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
                      <img className="flg" src={startup.countryFlag} alt="" />
                      <span className="cl">{startup.country}</span>
                    </span>
                    <span className="chip sector" title={startup.sector}>
                      <i className="sw" style={{ background: 'linear-gradient(18deg,#AA397B,#862D52)' }}></i>
                      <span className="cl">{startup.sector}</span>
                    </span>
                  </div>

                  <h3>{startup.name}</h3>
                  <p className="line">{startup.hook}</p>

                  <div className="stat">
                    <b>{startup.valuation || '$6.5bn'}</b>
                    <span>Valuation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Title, House Badge, and Key Stats Box */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f0e4]">
                {startup.name}
              </h1>
              <p className="text-sm text-[#f8f0e4cc] mt-2 leading-relaxed">
                {startup.hook}
              </p>
              <p className="text-xs text-[#f8f0e473] mt-1 font-mono">
                Based in Riyadh, founded 2019
              </p>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="chip feat" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <i className="fmmark" aria-hidden="true"></i>+ FM Featured
              </span>
              <span className="chip cty" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <img className="flg" src={startup.countryFlag} alt="" />
                <span>{startup.country}</span>
              </span>
              <span className="chip sector" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <i className="sw" style={{ background: 'linear-gradient(18deg,#AA397B,#862D52)' }}></i>
                <span>{startup.sector}</span>
              </span>
            </div>

            {/* House Crest Card (Orange) */}
            <div 
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 112, 47, 0.25) 0%, rgba(170, 63, 26, 0.35) 100%)',
                maxWidth: '280px'
              }}
            >
              <img 
                src={crestPath} 
                alt="" 
                style={{ width: '48px', height: '48px' }} 
              />
              <div>
                <span className="text-[10px] uppercase tracking-wider text-orange-400 font-mono font-bold block">
                  HOUSE {crestNumber < 10 ? `0${crestNumber}` : crestNumber}
                </span>
                <span className="text-xs text-white font-semibold">
                  Rank {crestNumber} in Founding 30
                </span>
              </div>
            </div>

            {/* Green Key Stats Grid Box (Matching Image 3) */}
            <div 
              className="p-5 rounded-xl border border-[#2F7A4A]/40"
              style={{
                background: 'linear-gradient(135deg, #0f3d26 0%, #082618 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)'
              }}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a3e6be] font-mono block">
                    Last Valuation
                  </span>
                  <b className="text-xl font-bold text-white block mt-0.5 font-mono">
                    {startup.valuation || '$6.5bn'}
                  </b>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a3e6be] font-mono block">
                    Total Raised
                  </span>
                  <b className="text-xl font-bold text-white block mt-0.5 font-mono">
                    $837m
                  </b>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a3e6be] font-mono block">
                    Headcount
                  </span>
                  <b className="text-xl font-bold text-white block mt-0.5 font-mono">
                    4,662
                  </b>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a3e6be] font-mono block">
                    Headcount Growth 1Y
                  </span>
                  <b className="text-xl font-bold text-white block mt-0.5 font-mono">
                    35.2%
                  </b>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#a3e6be] font-mono block">
                    Founded
                  </span>
                  <b className="text-xl font-bold text-white block mt-0.5 font-mono">
                    2019
                  </b>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Why it's on the list */}
        <div className="mb-10 pt-8 border-t border-white/10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Why it’s on the list
          </h5>
          <p className="text-sm sm:text-base text-[#f8f0e4cc] leading-relaxed font-sans max-w-3xl">
            Tabby is the most valuable venture-backed startup in MENA, valued at $6.5 billion in September 2026. It has been profitable since 2023 and processes more than $18 billion a year for 25 million registered users and 70,000 business partners, and is now expanding from buy now, pay later into broader financial services.
          </p>
        </div>

        {/* Section: Funding History */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Funding history
          </h5>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {fundingRounds.map((round, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 text-sm">
                <span className="font-mono text-xs text-[#f8f0e473] w-16">{round.year}</span>
                <b className="font-medium text-[#f8f0e4] flex-1">{round.stage}</b>
                <span className="font-mono font-bold text-[#f8f0e4]">{round.amt}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Investors */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Investors
          </h5>
          <div className="flex flex-wrap gap-2">
            {investors.map((inv, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-[#f8f0e4cc]"
              >
                {inv}
              </span>
            ))}
          </div>
        </div>

        {/* Section: Founders */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Founders
          </h5>
          <div className="flex items-center gap-4 p-3 rounded-xl border border-white/10 bg-[#17110c] max-w-sm">
            <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#241a12] flex items-center justify-center">
              <img 
                src="https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/ai/0c0ffc86-0b9c-49cf-8c1c-e3e089b2e76a/portrait-mv8bhhrp-cut.webp" 
                alt="Hosam Arab"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <b className="text-sm text-white block">Hosam Arab</b>
              <span className="text-xs text-[#f8f0e473]">Co-founder and CEO</span>
            </div>
          </div>
        </div>

        {/* Section: Peers in Founding 30 */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Peers in Founding 30
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {peers.map((peer, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-xl border border-white/10 flex flex-col justify-between"
                style={{ background: peer.bg, minHeight: '90px' }}
              >
                <div className="h-6 flex items-center">
                  <img src={peer.mark} alt="" className="max-h-5 max-w-[80%] object-contain" />
                </div>
                <div>
                  <b className="text-xs text-white block truncate">{peer.name}</b>
                  <span className="text-[10px] text-white/70 block">{peer.sector}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Shareable Assets */}
        <div className="mb-12">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Shareable Assets
          </h5>
          <div className="space-y-2">
            {[
              { title: 'LinkedIn post', sub: '1200 × 627 · PNG' },
              { title: 'Instagram story', sub: '1080 × 1920 · PNG' },
              { title: 'Instagram post', sub: '1080 × 1080 · PNG' }
            ].map((asset, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#2F7A4A] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">FM</span>
                  </div>
                  <div>
                    <b className="text-xs text-white block">{asset.title}</b>
                    <span className="text-[10px] text-[#f8f0e473]">{asset.sub}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer">
                    Share
                  </button>
                  <button className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer">
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Close Button */}
        <div className="pt-6 border-t border-white/10 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-lg bg-[#f9bf43] hover:bg-[#ea7648] text-[#100c08] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
