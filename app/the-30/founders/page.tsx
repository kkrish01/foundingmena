'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DuneBackground from '@/components/DuneBackground';
import Sidebar from '@/components/Sidebar';
import Appbar from '@/components/Appbar';
import Footer from '@/components/Footer';
import FounderModal from '@/components/FounderModal';
import siteData from '@/data/siteData.json';
import the30FoundersClean from '@/data/the30FoundersClean.json';
import { Founder } from '@/lib/api';

export default function The30FoundersPage() {
  const [selectedFounder, setSelectedFounder] = useState<Founder | null>(null);

  const handleFounderClick = (name: string) => {
    const found = siteData.founders.find(
      f => f.name.toLowerCase().trim() === name.toLowerCase().trim()
    );
    if (found) {
      setSelectedFounder(found as Founder);
    }
  };

  return (
    <div className="app">
      {/* Dynamic Dune Background */}
      <DuneBackground />

      {/* Main Navigation Sidebar */}
      <Sidebar />

      {/* Content Container */}
      <div className="content">
        <main className="screen" id="s-forty">
          {/* Mobile Appbar */}
          <Appbar />

          {/* 1. lhero Header */}
          <div
            className="lhero y1 dark"
            style={{
              // @ts-ignore
              '--season': '#F0702F',
              // @ts-ignore
              '--season-card': '#aa3f1a',
              // @ts-ignore
              '--banner': 'url(/textures/tex-sand-banner.webp)'
            }}
          >
            <div className="in">
              <div className="lock">
                <span className="icoslot" title="Icon slot">
                  <figure
                    className="crest "
                    style={{
                      // @ts-ignore
                      '--crest-card': '#aa3f1a',
                      // @ts-ignore
                      '--crest-ground': '#F0702F',
                      width: '56px'
                    }}
                  >
                    <div className="crestim" style={{ width: '56px', height: '56px' }}>
                      <img
                        className="crestsvg"
                        src="/crest/founder-house-x.svg"
                        alt=""
                        width="56"
                        height="56"
                        decoding="async"
                        fetchPriority="low"
                      />
                    </div>
                  </figure>
                </span>
                <div className="lockup">
                  <span className="introducing mono">Introducing</span>
                  <h1>
                    MENA’s Founding<em>30 Founders</em>
                  </h1>
                </div>
              </div>
              <p className="concept">Thirty founders building what comes next for the region.</p>
              <p>Thirty people, in no particular order. Group them how you like.</p>
            </div>
          </div>

          {/* 2. Dich Tabs */}
          <div className="dich">
            <Link className="" href="/the-30">
              <b>Startups</b>
              <span>Ranked 1 to 30</span>
            </Link>
            <Link className="on" href="/the-30/founders">
              <b>Founders</b>
              <span>The people</span>
            </Link>
          </div>

          {/* 3. List Body */}
          <div className="listbody">
            {/* Filter and sort button */}
            <div className="sortrow">
              <button
                type="button"
                className="fchip"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="butt"
                  strokeLinejoin="miter"
                  aria-hidden="true"
                >
                  <path d="M4 7h9M17 7h3M4 17h3M11 17h9M15 3.5v7M9 13.5v7"></path>
                </svg>
                Filter and sort
              </button>
            </div>

            {/* Founder Groups with Authentic Cards */}
            {the30FoundersClean.map((group) => (
              <section key={group.h4Html} className="fgrp">
                <h4
                  className="grouph"
                  dangerouslySetInnerHTML={{ __html: group.h4Html }}
                />
                <div className="fmgrid">
                  {group.cards.map((card) => (
                    <div
                      key={card.slug}
                      style={{ display: 'contents', cursor: 'pointer' }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleFounderClick(card.name);
                      }}
                      dangerouslySetInnerHTML={{ __html: card.rawHtml }}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Authentic Footer */}
          <Footer />
        </main>
      </div>

      {/* Interactive Founder Detail Modal */}
      <FounderModal
        founder={selectedFounder}
        onClose={() => setSelectedFounder(null)}
      />
    </div>
  );
}