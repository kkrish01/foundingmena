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
import Footer from '@/components/Footer';
import StartupModal from '@/components/StartupModal';
import FounderModal from '@/components/FounderModal';
import ShortModal from '@/components/ShortModal';
import CarouselModal from '@/components/CarouselModal';
import ArticleModal from '@/components/ArticleModal';
import StoryModal from '@/components/StoryModal';

import siteData from '@/data/siteData.json';
import { Startup, HeroStory, Founder, Short, Carousel, Article } from '@/lib/api';

export default function Home() {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);
  const [selectedShort, setSelectedShort] = useState<Short | null>(null);
  const [selectedCarousel, setSelectedCarousel] = useState<Carousel | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
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
              <ShortsRail 
                shorts={siteData.shorts} 
                onSelectShort={setSelectedShort}
              />
            )}

            {/* Carousels (Slide Decks) */}
            {siteData.carousels && siteData.carousels.length > 0 && (
              <CarouselsRail 
                carousels={siteData.carousels} 
                onSelectCarousel={setSelectedCarousel}
              />
            )}

            {/* Articles Grid */}
            {siteData.articles && siteData.articles.length > 0 && (
              <ArticlesGrid 
                articles={siteData.articles} 
                onSelectArticle={setSelectedArticle}
              />
            )}

            {/* Deals & Data Dashboard */}
            <DealsDataSection />

            {/* Authentic Footer with Newsletter Banner & Navigation */}
            <Footer />
          </div>
        </main>
      </div>

      {/* Floating Scroll to Top Button */}
      <button
        type="button"
        className="totop"
        aria-label="Back to top"
        onClick={() => {
          if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      >
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="butt" strokeLinejoin="miter" aria-hidden="true">
          <path d="M12 20V4M5 11l7-7 7 7" />
        </svg>
      </button>

      {/* Interactive Modal Views */}
      <StartupModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />

      <FounderModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
      />

      <ShortModal
        short={selectedShort}
        onClose={() => setSelectedShort(null)}
        onSelectShort={setSelectedShort}
        allShorts={siteData.shorts}
        articles={siteData.articles}
      />

      <CarouselModal
        carousel={selectedCarousel}
        onClose={() => setSelectedCarousel(null)}
        onSelectCarousel={setSelectedCarousel}
        allCarousels={siteData.carousels}
        articles={siteData.articles}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onSelectArticle={setSelectedArticle}
        allArticles={siteData.articles}
      />

      <StoryModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
}
