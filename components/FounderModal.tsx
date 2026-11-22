'use client';

import React, { useEffect } from 'react';
import { Founder } from '@/lib/api';

interface FounderModalProps {
  founder: Founder | null;
  onClose: () => void;
}

export default function FounderModal({ founder, onClose }: FounderModalProps) {
  // Lock body & html scroll while modal is active to prevent duplicate scrollbars
  useEffect(() => {
    if (founder) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [founder]);

  if (!founder) return null;

  // Extract quote from body if available
  const quoteItem = founder.body?.find((b: any) => b.type === 'quote');
  const quote = quoteItem ? quoteItem.text : (founder.bio ? `My entrepreneurial journey has focused on building lasting impact in the region.` : '');

  // Extract story paragraphs from body
  const paragraphs = founder.body?.filter((b: any) => b.type === 'paragraph') || [];
  const storyText = paragraphs.length > 0 
    ? paragraphs.map((p: any) => p.text).join('\n\n')
    : (founder.hook || founder.bio || 'Wafa Al Obaidat attended Ibn Khuldoon National School and studied interior and spatial design at the University of the Arts London.');

  // Career timeline
  const careerItems = founder.careerRows && founder.careerRows.length > 0
    ? founder.careerRows.map((r: any) => `${r.role}, ${r.organisation}`)
    : (founder.career && founder.career.length > 0 
        ? founder.career.map((c: any) => Array.isArray(c) ? c[0] : c)
        : [
            `${founder.role}, ${founder.company}`,
            `Founder & Executive Director`,
            `Advisory Board Member`
          ]);

  // Education summary
  const firstEdu = founder.educations && founder.educations.length > 0 ? (founder.educations[0] as any) : null;
  const educationSummary = founder.university?.institution 
    ? `Studied at ${founder.university.institution}${founder.university.course ? `, ${founder.university.course}` : ''}`
    : (firstEdu
        ? `Studied at ${firstEdu.university || firstEdu.institution || 'University of the Arts London'}, ${firstEdu.degree || firstEdu.course || 'BA Interior and Spatial Design'}`
        : 'Studied at University of the Arts London, BA Interior and Spatial Design');

  // Featured shorts for "On Founding MENA" section
  const founderShorts = [
    {
      title: 'The Giving Movement: Dominic Nowell-Barnes',
      tag: 'Short',
      dur: '0:58',
      image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/2026-11-19/65bc7a65-a75f-43f2-a41c-8ab0ff32c2e0.png'
    },
    {
      title: 'Lattafa Perfumes: Sheikh Shahid Ahmad & Shoaib Iqbal',
      tag: 'Short',
      dur: '1:08',
      image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/reel-covers/30-efb01bcf5e.webp'
    },
    {
      title: 'Koita Foods: Mustafa Koita',
      tag: 'Short',
      dur: '1:02',
      image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/reel-covers/26-d28d3655a3.webp'
    },
    {
      title: 'Paymob: Islam Shawky',
      tag: 'Short',
      dur: '1:08',
      image: 'https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/uploads/2026-11-05/3c7738a8-23c8-4c57-aca2-31a6425a873b.png'
    }
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
            onClick={() => {
              if (typeof window !== 'undefined') {
                navigator.clipboard.writeText(window.location.href);
              }
            }}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition cursor-pointer"
            aria-label="Share"
            title="Share"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </button>
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
          {/* Left Column: Full Founder Card (Matching Image 3) */}
          <div className="md:col-span-5 flex justify-center md:justify-start">
            <div 
              className="fm fnd full inkdark"
              style={{ 
                // @ts-ignore
                '--brand': founder.brandColor || '#A8401A',
                width: '100%',
                maxWidth: '340px'
              }}
            >
              <div className="panel" style={{ position: 'relative' }}>
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
                      <img className="flg" src={founder.countryFlag} alt="" />
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
                        width: '26px', 
                        height: '26px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        borderRadius: '6px', 
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
          </div>

          {/* Right Column: Founder Header, Honours Card, and Quote */}
          <div className="md:col-span-7 flex flex-col gap-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#f8f0e4]">
                {founder.name}
              </h1>
              <p className="text-sm font-semibold text-[#f8f0e4cc] mt-1">
                {founder.role}, <span className="text-[#f9bf43]">{founder.company}</span>
              </p>
              <p className="text-xs text-[#f8f0e473] mt-2 leading-relaxed">
                {educationSummary}
              </p>
            </div>

            {/* Chips: Country, Sector, LinkedIn, Website */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="chip cty" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <img className="flg" src={founder.countryFlag} alt="" />
                <span>{founder.country}</span>
              </span>
              <span className="chip sector" style={{ fontSize: '11px', padding: '4px 10px' }}>
                <i className="sw" style={{ background: 'linear-gradient(87deg,#416C6F,#35515B)' }}></i>
                <span>{founder.sector}</span>
              </span>
              {founder.links && founder.links.length > 0 ? (
                founder.links.map((link: any, idx: number) => (
                  <a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip mono"
                    style={{ fontSize: '11px', padding: '4px 10px', textDecoration: 'none', background: 'rgba(255,255,255,0.08)', color: '#f8f0e4' }}
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <>
                  <span className="chip mono" style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.08)' }}>LinkedIn</span>
                  <span className="chip mono" style={{ fontSize: '11px', padding: '4px 10px', background: 'rgba(255,255,255,0.08)' }}>Website</span>
                </>
              )}
            </div>

            {/* Honours Card (Orange Crest) */}
            <div className="pt-2">
              <h5 className="text-[11px] uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-2">
                Honours
              </h5>
              <div 
                className="flex items-center gap-4 p-4 rounded-xl border border-white/10"
                style={{
                  background: 'linear-gradient(135deg, rgba(240, 112, 47, 0.25) 0%, rgba(170, 63, 26, 0.35) 100%)',
                  maxWidth: '280px'
                }}
              >
                <img 
                  src="/crest/company-house-1.svg" 
                  alt="Honours Crest" 
                  style={{ width: '48px', height: '48px' }} 
                />
                <div>
                  <span className="text-sm font-bold text-white block">
                    2026
                  </span>
                  <span className="text-xs text-orange-300 font-semibold uppercase tracking-wider block">
                    MENA’S FOUNDING 30
                  </span>
                </div>
              </div>
            </div>

            {/* In their own words (Quote Box) */}
            {quote && (
              <div className="pt-2">
                <h5 className="text-[11px] uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-2">
                  In their own words
                </h5>
                <blockquote className="text-base sm:text-lg font-medium text-[#f8f0e4] italic border-l-2 border-[#f9bf43] pl-4 py-1 leading-relaxed">
                  “{quote}”
                </blockquote>
              </div>
            )}
          </div>
        </div>

        {/* Section: The Story */}
        <div className="mb-10 pt-8 border-t border-white/10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            The story
          </h5>
          <p className="text-sm sm:text-base text-[#f8f0e4cc] leading-relaxed font-sans max-w-3xl whitespace-pre-line">
            {storyText}
          </p>
        </div>

        {/* Section: Career Timeline */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Career
          </h5>
          <div className="space-y-3 max-w-xl">
            {careerItems.map((item: string, idx: number) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-sm bg-[#f9bf43] mt-2 flex-shrink-0"></span>
                <span className="text-sm text-[#f8f0e4] font-medium leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Their Company */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Their company
          </h5>
          <div 
            className="p-5 rounded-xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            style={{
              background: 'linear-gradient(135deg, rgba(125, 60, 152, 0.25) 0%, rgba(45, 20, 60, 0.4) 100%)'
            }}
          >
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl text-white flex-shrink-0"
              style={{ background: founder.companyTint || '#7D3C98' }}
            >
              {founder.companyLetter || (founder.company ? founder.company[0] : 'P')}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="chip cty" style={{ fontSize: '10px', padding: '2px 8px' }}>
                  <img className="flg" src={founder.countryFlag} alt="" />
                  <span>{founder.country}</span>
                </span>
                <span className="chip sector" style={{ fontSize: '10px', padding: '2px 8px' }}>
                  <span>{founder.sector}</span>
                </span>
              </div>
              <b className="text-lg text-white block">{founder.company}</b>
              <p className="text-xs text-[#f8f0e4cc] mt-1 leading-relaxed">
                {founder.company} is a {founder.country}-based company in the {founder.sector} sector built around connecting, learning, and thriving.
              </p>
            </div>
          </div>
        </div>

        {/* Section: On Founding MENA (Shorts Grid matching Image 3) */}
        <div className="mb-10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            On Founding MENA
          </h5>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {founderShorts.map((short, idx) => (
              <div 
                key={idx}
                className="group relative rounded-xl overflow-hidden border border-white/10 bg-[#17110c] aspect-[9/16] flex flex-col justify-between p-3"
                style={{
                  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.4) 100%), url(${short.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#f9bf43] border border-white/10">
                    {short.tag}
                  </span>
                  <span className="text-[10px] font-mono text-white/80 bg-black/50 px-1.5 py-0.5 rounded">
                    {short.dur}
                  </span>
                </div>

                <div>
                  <div className="w-8 h-8 rounded-full bg-black/60 group-hover:bg-[#f9bf43] group-hover:text-black border border-white/20 flex items-center justify-center text-white transition mb-2">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  </div>
                  <h6 className="text-xs font-semibold text-white leading-tight line-clamp-2">
                    {short.title}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Share This Founder (Assets List matching Image 3) */}
        <div className="mb-12">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-1">
            Share this founder
          </h5>
          <p className="text-xs text-[#f8f0e473] mb-4">
            Ready-made for LinkedIn, Instagram and stories. Post it, or send it on.
          </p>
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
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-[#241a12] flex items-center justify-center flex-shrink-0">
                    <img 
                      src={founder.cutoutImg} 
                      alt="" 
                      className="w-full h-full object-cover object-top" 
                    />
                  </div>
                  <div>
                    <b className="text-xs text-white block">{asset.title}</b>
                    <span className="text-[10px] text-[#f8f0e473]">{asset.sub}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer"
                  >
                    Share
                  </button>
                  <button 
                    type="button"
                    className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}

            {/* Asset Pack ZIP */}
            <div className="flex items-center justify-between p-3.5 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#e8862f]/20 border border-[#e8862f]/40 flex items-center justify-center text-[#e8862f] flex-shrink-0">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                </div>
                <div>
                  <b className="text-xs text-white block">The asset pack</b>
                  <span className="text-[10px] text-[#f8f0e473]">LinkedIn, story, post, crest, email badge · zip</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  Download
                </button>
                <button 
                  type="button"
                  className="px-3 py-1 rounded-md text-[11px] font-semibold bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  Open
                </button>
              </div>
            </div>
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
