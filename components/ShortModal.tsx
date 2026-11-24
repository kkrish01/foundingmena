'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Short, Article } from '@/lib/api';
import Footer from '@/components/Footer';

interface ShortModalProps {
  short: Short | null;
  onClose: () => void;
  onSelectShort: (short: Short) => void;
  allShorts: Short[];
  articles: Article[];
}

export default function ShortModal({
  short,
  onClose,
  onSelectShort,
  allShorts,
  articles
}: ShortModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  // Lock body & html scroll while modal is active
  useEffect(() => {
    if (short) {
      document.documentElement.classList.add('modal-open');
      document.body.classList.add('modal-open');
      return () => {
        document.documentElement.classList.remove('modal-open');
        document.body.classList.remove('modal-open');
      };
    }
  }, [short]);

  // Restart video playback when active short changes
  useEffect(() => {
    if (videoRef.current && short) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [short]);

  if (!short) return null;

  const videoSrc = short.videoUrl 
    ? `/api/media?url=${encodeURIComponent(short.videoUrl)}`
    : null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      if (total > 0) {
        setProgress((current / total) * 100);
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = clickX / rect.width;
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = pct * videoRef.current.duration;
      setProgress(pct * 100);
    }
  };

  // Up Next items excluding current short
  const upNextShorts = allShorts.filter(s => s.id !== short.id);

  return (
    <div 
      className="startup-modal-container animate-fadeIn"
      style={{ scrollbarWidth: 'thin' }}
    >
      {/* Top Fixed Navigation Bar */}
      <div className="sticky top-0 z-30 bg-[#100c08]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between w-full" style={{ height: '64px' }}>
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

      {/* Main Single View Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        {/* Center Vertical Video Player (9:16 Aspect Ratio) */}
        <div className="flex justify-center mb-12">
          <div 
            className="relative w-full max-w-[400px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/15 cursor-pointer group"
            style={{ aspectRatio: '9/16' }}
            onClick={togglePlay}
          >
            {/* Background Video Player */}
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                loop
                autoPlay
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                poster={short.image}
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <img
                src={short.image}
                alt={short.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}

            {/* Gradient Overlays for readable text */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#100c08] via-transparent to-black/40"></div>

            {/* Top Right Sound / Mute Button */}
            <button
              type="button"
              onClick={toggleMute}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-md"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6"></path>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
              )}
            </button>

            {/* Center Play Button Overlay (when paused) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-black/70 border border-white/30 text-white flex items-center justify-center backdrop-blur-sm shadow-xl">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <polygon points="6 4 20 12 6 20 6 4"></polygon>
                  </svg>
                </div>
              </div>
            )}

            {/* Bottom Overlay Content (matching Image 2) */}
            <div className="absolute bottom-0 left-0 right-0 p-5 z-20 flex flex-col pointer-events-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-[#f9bf43] text-[#100c08] font-mono">
                  Short
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                {short.title}
              </h3>

              <div className="text-xs font-mono text-[#f8f0e4aa] mt-1 mb-2">
                Founding MENA · {short.dur}
              </div>

              <p className="text-xs sm:text-sm text-[#f8f0e4cc] line-clamp-3 leading-relaxed mb-3">
                {short.description}
              </p>

              {short.person && (
                <div className="text-xs text-[#f8f0e4aa] mb-3">
                  With <span className="text-white font-semibold underline underline-offset-2">{short.person}</span>
                </div>
              )}

              {/* Tags and Share Button */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="chip cty" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    <img className="flg" src={short.countryFlag} alt="" />
                    <span>{short.country}</span>
                  </span>
                  <span className="chip sector" style={{ fontSize: '10px', padding: '2px 8px' }}>
                    <span>{short.sector}</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigator.clipboard.writeText(window.location.href);
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 transition cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" y1="2" x2="12" y2="15"></line>
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              {/* Bottom Interactive Progress Bar Line */}
              <div 
                className="w-full h-1 bg-white/20 hover:h-1.5 rounded-full overflow-hidden mt-4 cursor-pointer transition-all"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-[#f9bf43] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: UP NEXT (matching Image 2) */}
        <div className="mb-12">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Up next
          </h5>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {upNextShorts.map((s) => (
              <div
                key={s.id}
                onClick={() => onSelectShort(s)}
                className="w-[180px] flex-shrink-0 rounded-xl overflow-hidden bg-[#0d0907] border border-white/10 hover:border-[#f9bf43]/60 cursor-pointer transition-all group flex flex-col"
              >
                <div className="relative w-full aspect-[9/16] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-black/60 text-white border border-white/15">
                    SHORT
                  </span>
                  <span className="absolute bottom-2 right-2 z-10 w-6 h-6 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
                      <polygon points="6 4 20 12 6 20 6 4"></polygon>
                    </svg>
                  </span>
                </div>
                <div className="p-2.5 bg-[#0d0907] border-t border-white/10">
                  <p className="text-xs font-semibold text-white truncate" title={s.title}>
                    {s.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: READ MORE ON THIS (matching Image 2) */}
        <div className="mb-12">
          <h5 className="text-xs uppercase font-mono tracking-wider text-[#f8f0e473] font-semibold mb-3">
            Read more on this
          </h5>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {articles.slice(0, 3).map((art) => (
              <a
                key={art.id}
                href={art.href}
                className="rounded-xl overflow-hidden border border-white/10 bg-[#17110c] hover:border-white/30 transition flex flex-col text-decoration-none group"
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
                  <h6 className="text-sm font-semibold text-white leading-snug group-hover:text-[#f9bf43] transition">
                    {art.title}
                  </h6>
                  <span className="text-[11px] font-mono text-[#f8f0e473] mt-2 block">
                    FOUNDING MENA
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Authentic Footer Component */}
      <Footer />
    </div>
  );
}
