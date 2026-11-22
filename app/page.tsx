'use client';

import React, { useState } from 'react';
import DuneBackground from '@/components/DuneBackground';
import Sidebar from '@/components/Sidebar';
import Appbar from '@/components/Appbar';
import HeroCarousel from '@/components/HeroCarousel';
import CountriesSectors from '@/components/CountriesSectors';
import StartupsRail from '@/components/StartupsRail';
import FoundersRail from '@/components/FoundersRail';
import ShortsRail from '@/components/ShortsRail';
import CarouselsRail from '@/components/CarouselsRail';
import ArticlesGrid from '@/components/ArticlesGrid';
import DealsDataSection from '@/components/DealsDataSection';
import NewsletterBanner from '@/components/NewsletterBanner';
import StartupModal from '@/components/StartupModal';
import FounderModal from '@/components/FounderModal';
import StoryModal from '@/components/StoryModal';

import siteData from '@/data/siteData.json';
import { Startup, HeroStory, Founder } from '@/lib/api';

export default function Home() {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [selectedStory, setSelectedStory] = useState<HeroStory | null>(null);

  return (
    <div className="app">
      {/* 1. Live WebGL Desert-Dune Canvas Shader */}
      <DuneBackground />

      {/* 2. Left-docked Desktop & Mobile Sidebar Navigation */}
      <Sidebar />

      {/* 3. Main Content Screen */}
      <div className="content">
        <main className="screen" id="s-home">
          {/* Mobile Appbar (auto-hidden on desktop) */}
          <Appbar />

          {/* Hero Carousel: with authentic covers and bottom-right controls */}
          <HeroCarousel
            stories={siteData.heroStories}
            onSelectStory={setSelectedStory}
          />

          {/* Rails Container wrapping all content sections */}
          <div id="rails">
            {/* Countries & Sectors Tag Rails (with Indian Cities) */}
            <CountriesSectors
              countries={siteData.countries}
              sectors={siteData.sectors}
            />

            {/* MENA's Founding 30: Startups */}
            <StartupsRail
              startups={siteData.startups}
              onSelectStartup={setSelectedStartup}
            />

            {/* MENA's Founding 30: Founders */}
            <FoundersRail 
              founders={siteData.founders} 
              onSelectFounder={setSelectedFounder}
            />

            {/* Shorts (Vertical Video Reels) */}
            {siteData.shorts && siteData.shorts.length > 0 && (
              <ShortsRail shorts={siteData.shorts} />
            )}

            {/* Carousels (Slide Decks) */}
            {siteData.carousels && siteData.carousels.length > 0 && (
              <CarouselsRail carousels={siteData.carousels} />
            )}

            {/* Articles Grid */}
            {siteData.articles && siteData.articles.length > 0 && (
              <ArticlesGrid articles={siteData.articles} />
            )}

            {/* Deals & Data Dashboard */}
            <DealsDataSection />

            {/* Newsletter Banner */}
            <NewsletterBanner />

            {/* Footer Navigation & Copyright */}
            <footer 
              className="footer" 
              style={{ 
                padding: '24px var(--pad) 24px', 
                borderTop: '1px solid rgba(255,255,255,0.08)', 
                marginTop: '24px' 
              }}
            >
              <nav className="fnav" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 18px', marginBottom: '18px', fontSize: '13px' }}>
                <a href="/" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Home</a>
                <a href="#the-30" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>The 30</a>
                <a href="#newsletter" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Newsletter</a>
                <a href="#countries" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Cities</a>
                <a href="#watch" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Watch</a>
                <a href="#articles" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Articles</a>
                <a href="#the-30" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Companies</a>
                <a href="#the-30-founders" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Founders</a>
                <a href="#deals" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Deals &amp; data</a>
                <a href="#about" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>About</a>
                <a href="#contact" style={{ color: 'rgba(255,243,224,0.75)', textDecoration: 'none' }}>Contact</a>
              </nav>

              <div className="fmeta" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', fontSize: '11.5px', color: 'rgba(255,255,255,0.4)', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src="https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/logos/logo_row.svg" 
                    alt="Founding MENA" 
                    style={{ height: '16px', width: 'auto', opacity: 0.8 }}
                  />
                  <span>© 2026 Himma Media</span>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <a href="#privacy" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Privacy</a>
                  <span>·</span>
                  <a href="#terms" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Terms</a>
                  <span>·</span>
                  <a href="#ethics" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>Ethics</a>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Interactive Modal Views */}
      <StartupModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />

      <FounderModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
      />

      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
}
