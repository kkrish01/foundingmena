'use client';

import React from 'react';
import { HeroStory } from '@/lib/api';
import { X, Clock, Share2, Check } from 'lucide-react';

interface StoryModalProps {
  story: HeroStory | null;
  onClose: () => void;
}

export default function StoryModal({ story, onClose }: StoryModalProps) {
  const [copied, setCopied] = React.useState(false);

  if (!story) return null;

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#17110c] border border-white/20 text-[#f8f0e4] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 243, 224, 0.12)'
        }}
      >
        {/* Top Header */}
        <div className="p-4 border-b border-white/10 flex justify-between items-center text-xs bg-[#1c140e]">
          <span className="chip mono" style={{ background: '#f9bf43', color: '#100c08', fontWeight: 'bold' }}>
            {story.tag}
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 text-white/70 hover:text-white transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6">
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold leading-tight text-[#fff3e0]">
            {story.title}
          </h1>

          <div className="relative w-full h-[260px] sm:h-[360px] rounded-lg overflow-hidden border border-white/10">
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-[#f8f0e4cc] text-base sm:text-lg leading-relaxed space-y-4 font-serif">
            {story.excerpt.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
