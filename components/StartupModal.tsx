'use client';

import React from 'react';
import { Startup } from '@/lib/api';
import { X, ExternalLink, Calendar, DollarSign, Award, MapPin } from 'lucide-react';

interface StartupModalProps {
  startup: Startup | null;
  onClose: () => void;
}

export default function StartupModal({ startup, onClose }: StartupModalProps) {
  if (!startup) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-[#17110c] border border-white/20 text-[#f8f0e4] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), inset 0 0 0 1px rgba(255, 243, 224, 0.12)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-start bg-[#1c140e]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="chip fm40" style={{ fontSize: '11px' }}>
                FM<b>30</b>
              </span>
              <span className="chip cty" style={{ fontSize: '11px' }}>
                <img className="flg" src={startup.countryFlag} alt="" />
                <span>{startup.country}</span>
              </span>
              <span className="chip sector" style={{ fontSize: '11px' }}>
                <i className="sw" style={{ background: 'linear-gradient(18deg,#AA397B,#862D52)' }}></i>
                <span>{startup.sector}</span>
              </span>
            </div>
            <h2 className="font-editorial text-4xl font-bold text-[#fff3e0] tracking-tight">
              {startup.name}
            </h2>
            <p className="text-xs text-[#d6b080] mt-1">
              {startup.hook}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-[#241a12] p-3.5 border border-white/10 rounded-lg">
              <div className="text-[10px] uppercase tracking-wider text-[#d6b080] font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#f9bf43]" /> Valuation
              </div>
              <div className="text-base font-bold text-white mt-1 font-mono">
                {startup.valuation || '$1.0B+ (Unicorn)'}
              </div>
            </div>

            <div className="bg-[#241a12] p-3.5 border border-white/10 rounded-lg">
              <div className="text-[10px] uppercase tracking-wider text-[#d6b080] font-semibold flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" /> Total Raised
              </div>
              <div className="text-base font-bold text-white mt-1 font-mono">
                {startup.raised || '$250M+'}
              </div>
            </div>

            <div className="bg-[#241a12] p-3.5 border border-white/10 rounded-lg col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase tracking-wider text-[#d6b080] font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#f9bf43]" /> Headquarters
              </div>
              <div className="text-sm font-bold text-white mt-1 truncate">
                {startup.country}
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#f9bf43] font-bold border-b border-white/10 pb-1.5 mb-2.5">
              Intelligence Briefing
            </h4>
            <p className="text-sm text-[#f8f0e4cc] leading-relaxed">
              {startup.hook}. Tracked as part of Founding MENA’s premier venture index highlighting scale-ups operating across the GCC and North Africa.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-[#140e0a] flex justify-between items-center text-xs">
          <span className="text-white/40">
            Source: Founding MENA Verified Intelligence
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#f9bf43] text-[#100c08] font-bold rounded-md hover:bg-[#ea7648] transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
