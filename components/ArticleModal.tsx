'use client';

import React, { useEffect, useState } from 'react';
import { Article } from '@/lib/api';
import Footer from '@/components/Footer';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
}

export default function ArticleModal({
  article,
  onClose,
  onSelectArticle,
  allArticles
}: ArticleModalProps) {
  // Lock body & html scroll while modal is active
  useEffect(() => {
    if (article) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [article]);

  if (!article) return null;

  const otherArticles = allArticles.filter((a) => a.id !== article.id);

  return (
    <div 
      className="startup-modal-container animate-fadeIn"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Top Fixed Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#100c08]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between w-full" style={{ height: '64px' }}>
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition cursor-pointer flex items-center justify-center"
              aria-label="Share"
              title="Share"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="butt" strokeLinejoin="miter">
                <path d="M12 3v12M7 8l5-5 5 5M5 14v6h14v-6"></path>
              </svg>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition cursor-pointer flex items-center justify-center"
              aria-label="Close"
              title="Close"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Top Hero Banner Visual */}
      <div className="relative w-full h-[320px] sm:h-[420px] overflow-hidden bg-black">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#100c08] via-[#100c08]/40 to-transparent"></div>
      </div>

      {/* Article Reading Column (matching Image 2) */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 -mt-20 relative z-10">
        {/* Story Pill Badge */}
        <div className="mb-3">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-white/10 text-white font-mono border border-white/15">
            STORY
          </span>
        </div>

        {/* Article Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-3">
          {article.title}
        </h1>

        {/* Metadata Byline & Date */}
        <div className="text-xs font-mono text-[#f8f0e4aa] uppercase tracking-wider mb-4">
          {article.byline || 'FM DESK'} · {article.date || '19 NOV 2026'} · {article.readTime || '6 MIN READ'}
        </div>

        {/* Tag Row: Country Flag & Sector */}
        <div className="flex items-center gap-2 flex-wrap mb-8 pb-4 border-b border-white/10">
          {article.country && (
            <span className="chip cty" style={{ fontSize: '11px', padding: '3px 8px' }}>
              {article.countryFlag && <img className="flg" src={article.countryFlag} alt="" />}
              <span>{article.country}</span>
            </span>
          )}
          {article.sector && (
            <span className="chip sector" style={{ fontSize: '11px', padding: '3px 8px' }}>
              <span>{article.sector}</span>
            </span>
          )}
        </div>

        {/* Lead Paragraph */}
        {article.lead && (
          <p className="text-lg sm:text-xl font-medium text-[#f8f0e4ee] leading-relaxed mb-8">
            {article.lead}
          </p>
        )}

        {/* Editorial Subheadings & Paragraphs */}
        {article.sections && article.sections.length > 0 ? (
          article.sections.map((sec: any, sIdx: number) => (
            <div key={sIdx} className="my-8">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-4 mt-6">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p: string, pIdx: number) => (
                <p key={pIdx} className="text-base sm:text-lg text-[#f8f0e4cc] leading-relaxed mb-5">
                  {p}
                </p>
              ))}
            </div>
          ))
        ) : (
          <p className="text-base sm:text-lg text-[#f8f0e4cc] leading-relaxed mb-6">
            {article.description}
          </p>
        )}

        {/* Data / Chart Callout Box (matching Image 2) */}
        {article.statBox && (
          <div className="my-10 p-6 rounded-2xl border border-white/10 bg-[#17110c] max-w-md shadow-xl">
            <div className="text-xs font-mono uppercase tracking-wider text-[#f9bf43] font-semibold mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f9bf43]"></span>
              {article.statBox.label}
            </div>
            <div className="text-4xl font-bold text-white font-mono mb-1">
              {article.statBox.stat}
            </div>
            <div className="text-xs text-[#f8f0e4aa] mb-4">
              {article.statBox.subtitle}
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#e8862f] to-[#f9bf43]" 
                style={{ width: `${article.statBox.pct}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Inline Newsletter Box (matching Image 2) */}
        <div className="my-12 p-6 rounded-2xl border border-white/10 bg-[#17110c] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <b className="text-base text-white block">The Founding MENA newsletter</b>
            <span className="text-xs text-[#f8f0e473]">The week in MENA tech, every Monday. Free.</span>
          </div>
          <button 
            type="button"
            className="px-5 py-2.5 rounded-lg bg-[#e8862f] hover:bg-[#d07525] text-[#100c08] font-bold text-xs uppercase tracking-wider transition cursor-pointer flex-shrink-0"
          >
            Subscribe
          </button>
        </div>

        {/* Section: Related Articles (matching Image 2) */}
        <div className="my-12 pt-8 border-t border-white/10">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-4">
            Read more on this
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherArticles.slice(0, 3).map((art) => (
              <div
                key={art.id}
                onClick={() => onSelectArticle(art)}
                className="rounded-xl overflow-hidden border border-white/10 bg-[#17110c] hover:border-[#f9bf43]/60 transition flex flex-col cursor-pointer group shadow-md"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-[#f9bf43] border border-white/15">
                    STORY
                  </span>
                </div>
                <div className="p-3.5 flex flex-col justify-between flex-1">
                  <h6 className="text-xs sm:text-sm font-semibold text-white leading-snug group-hover:text-[#f9bf43] transition line-clamp-2">
                    {art.title}
                  </h6>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#f8f0e473] mt-3">
                    <span>{art.date || 'NOV 2026'}</span>
                    <span className="text-[#f9bf43]">{art.sector}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Authentic Footer Component */}
      <Footer />
    </div>
  );
}
