'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import DuneBackground from '@/components/DuneBackground';
import Sidebar from '@/components/Sidebar';
import Appbar from '@/components/Appbar';
import Footer from '@/components/Footer';
import StartupModal from '@/components/StartupModal';
import siteData from '@/data/siteData.json';
import the30Data from '@/data/the30Data.json';
import { Startup } from '@/lib/api';

export default function The30Page() {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const [filterCountry, setFilterCountry] = useState<string>('all');
  const [filterSector, setFilterSector] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('rank');
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  // Available filters
  const countries = useMemo(() => {
    return Array.from(new Set(the30Data.map(d => d.country).filter(Boolean)));
  }, []);

  const sectors = useMemo(() => {
    return Array.from(new Set(the30Data.map(d => d.sector).filter(Boolean)));
  }, []);

  // Filter & sort logic
  const filteredStartups = useMemo(() => {
    let result = [...the30Data];

    if (filterCountry !== 'all') {
      result = result.filter(d => d.country === filterCountry);
    }
    if (filterSector !== 'all') {
      result = result.filter(d => d.sector === filterSector);
    }

    if (sortBy === 'valuation') {
      const parseVal = (v: string) => {
        const num = parseFloat(v.replace(/[^0-9.]/g, '')) || 0;
        return v.includes('bn') ? num * 1000 : num;
      };
      result.sort((a, b) => parseVal(b.valuation) - parseVal(a.valuation));
    } else if (sortBy === 'growth') {
      const parseGrowth = (g: string) => parseFloat(g.replace(/[^0-9.-]/g, '')) || 0;
      result.sort((a, b) => parseGrowth(b.growth) - parseGrowth(a.growth));
    } else if (sortBy === 'headcount') {
      const parseHc = (h: string) => parseInt(h.replace(/[^0-9]/g, ''), 10) || 0;
      result.sort((a, b) => parseHc(b.headcount) - parseHc(a.headcount));
    } else {
      result.sort((a, b) => a.rank - b.rank);
    }

    return result;
  }, [filterCountry, filterSector, sortBy]);

  const handleCardClick = (slug: string) => {
    const found = siteData.startups.find(s => s.id === slug);
    if (found) {
      setSelectedStartup(found as Startup);
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
                    MENA’s Founding<em>30 Startups</em>
                  </h1>
                </div>
              </div>
              <p className="concept">Thirty startups building what comes next for the region.</p>
              <p>Ranked one to thirty by valuation, growth and hiring.</p>
            </div>
          </div>

          {/* 2. Dich Tabs */}
          <div className="dich">
            <Link className="on" href="/the-30">
              <b>Startups</b>
              <span>Ranked 1 to 30</span>
            </Link>
            <Link className="" href="/the-30/founders">
              <b>Founders</b>
              <span>The people</span>
            </Link>
          </div>

          {/* 3. List Body */}
          <div className="listbody">
            <div className="sortrow" style={{ position: 'relative' }}>
              <button
                type="button"
                className={`fchip ${isFilterOpen ? 'on' : ''}`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
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
                {(filterCountry !== 'all' || filterSector !== 'all' || sortBy !== 'rank') && (
                  <span
                    style={{
                      background: 'var(--accent, #e09410)',
                      color: '#100c08',
                      borderRadius: '50%',
                      width: '6px',
                      height: '6px',
                      display: 'inline-block'
                    }}
                  />
                )}
              </button>

              {/* Filter and Sort Popover */}
              {isFilterOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    zIndex: 50,
                    background: '#1a140f',
                    border: '1px solid rgba(255, 243, 224, 0.15)',
                    borderRadius: '12px',
                    padding: '16px',
                    minWidth: '280px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  <div style={{ marginBottom: '14px' }}>
                    <div className="mono" style={{ fontSize: '11px', color: '#f8f0e480', marginBottom: '8px' }}>
                      Sort by
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {[
                        { id: 'rank', label: 'Rank' },
                        { id: 'valuation', label: 'Valuation' },
                        { id: 'headcount', label: 'Headcount' },
                        { id: 'growth', label: 'Growth' }
                      ].map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSortBy(s.id)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            background: sortBy === s.id ? 'var(--pink, #fff3e0)' : 'rgba(255,255,255,0.06)',
                            color: sortBy === s.id ? '#100c08' : '#f8f0e4',
                            fontWeight: sortBy === s.id ? 600 : 400
                          }}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '14px' }}>
                    <div className="mono" style={{ fontSize: '11px', color: '#f8f0e480', marginBottom: '8px' }}>
                      Country
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setFilterCountry('all')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          background: filterCountry === 'all' ? 'var(--pink, #fff3e0)' : 'rgba(255,255,255,0.06)',
                          color: filterCountry === 'all' ? '#100c08' : '#f8f0e4',
                          fontWeight: filterCountry === 'all' ? 600 : 400
                        }}
                      >
                        All
                      </button>
                      {countries.map(c => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setFilterCountry(c)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            background: filterCountry === c ? 'var(--pink, #fff3e0)' : 'rgba(255,255,255,0.06)',
                            color: filterCountry === c ? '#100c08' : '#f8f0e4',
                            fontWeight: filterCountry === c ? 600 : 400
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <div className="mono" style={{ fontSize: '11px', color: '#f8f0e480', marginBottom: '8px' }}>
                      Sector
                    </div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setFilterSector('all')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '12px',
                          background: filterSector === 'all' ? 'var(--pink, #fff3e0)' : 'rgba(255,255,255,0.06)',
                          color: filterSector === 'all' ? '#100c08' : '#f8f0e4',
                          fontWeight: filterSector === 'all' ? 600 : 400
                        }}
                      >
                        All
                      </button>
                      {sectors.map(s => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setFilterSector(s)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '12px',
                            background: filterSector === s ? 'var(--pink, #fff3e0)' : 'rgba(255,255,255,0.06)',
                            color: filterSector === s ? '#100c08' : '#f8f0e4',
                            fontWeight: filterSector === s ? 600 : 400
                          }}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {(filterCountry !== 'all' || filterSector !== 'all' || sortBy !== 'rank') && (
                    <div style={{ marginTop: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '8px', textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => {
                          setFilterCountry('all');
                          setFilterSector('all');
                          setSortBy('rank');
                        }}
                        style={{ fontSize: '12px', color: '#e09410', textDecoration: 'underline' }}
                      >
                        Reset filters
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 4. Podium Grid */}
            <div className="podium">
              {filteredStartups.map((item) => {
                const cbgVal = item.countryStyle.includes('--cbg:')
                  ? item.countryStyle.split('--cbg:')[1].replace(';', '').trim()
                  : undefined;

                return (
                  <a
                    key={item.slug}
                    className={`fm stp row ${item.isInkDark ? 'inkdark' : ''}`}
                    style={{
                      // @ts-ignore
                      '--brand': item.brandColor
                    }}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCardClick(item.slug);
                    }}
                  >
                    {/* Left Brand Panel */}
                    <div className="panel sq">
                      <span
                        className="gg"
                        data-g="g36"
                        data-tint={item.groundTint}
                        data-bright="1"
                        data-live="1"
                        style={{
                          // @ts-ignore
                          '--gtint': item.groundTint,
                          // @ts-ignore
                          '--gfall': item.groundTint,
                          backgroundImage: `url(${item.groundBg})`,
                          backgroundColor: item.groundTint
                        }}
                        aria-hidden="true"
                      />
                      <div
                        className="markwrap"
                        dangerouslySetInnerHTML={{ __html: item.markwrapInner }}
                      />
                      <i className="seam" />
                    </div>

                    {/* Circular Rank Crest Badge */}
                    <span className="badge sm" aria-hidden="true">
                      <figure
                        className="crest "
                        style={{
                          // @ts-ignore
                          '--crest-card': '#aa3f1a',
                          // @ts-ignore
                          '--crest-ground': '#F0702F',
                          width: '54px'
                        }}
                      >
                        <div className="crestim" style={{ width: '54px', height: '54px' }}>
                          <img
                            className="crestsvg"
                            src={item.crest}
                            alt=""
                            width="54"
                            height="54"
                            decoding="async"
                            fetchPriority="low"
                          />
                        </div>
                      </figure>
                    </span>

                    {/* Card Body Plate */}
                    <div className="plate">
                      <div
                        className="fill"
                        style={{ backgroundImage: `url(${item.groundBg})` }}
                      />
                      <i className="seam" />
                      <div className="pin">
                        <div className="chips">
                          {item.isFeatured && (
                            <span className="chip feat">
                              <i className="fmmark" aria-hidden="true" />
                              FM featured
                            </span>
                          )}
                          <span className="chip fm40">
                            <svg
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.6"
                              strokeLinecap="butt"
                              strokeLinejoin="miter"
                              aria-hidden="true"
                              className="ci"
                            >
                              <path d="M4 7.5 19.5 6 12.3 19.5 11.7 11.8z"></path>
                            </svg>
                            FM<b>30</b>
                          </span>
                          <span
                            className="chip cty"
                            title={item.country}
                            style={{
                              // @ts-ignore
                              '--cbg': cbgVal
                            }}
                          >
                            <img className="flg" src={item.countryFlag} alt="" loading="lazy" />{' '}
                            <span className="cl">{item.country}</span>
                          </span>
                          <span className="chip sector" title={item.sector}>
                            <i className="sw" style={{ background: item.sectorGradient }} />{' '}
                            <span className="cl">{item.sector}</span>
                          </span>
                        </div>

                        {item.hasWordmark ? (
                          <h3 dangerouslySetInnerHTML={{ __html: item.h3Content }} />
                        ) : (
                          <h3>{item.name}</h3>
                        )}

                        <p className="line">{item.hook}</p>

                        <div className="stats3">
                          <div>
                            <b>{item.valuation}</b>
                            <span>Valuation</span>
                          </div>
                          <div>
                            <b>{item.headcount}</b>
                            <span>Headcount</span>
                          </div>
                          <div>
                            <b>{item.growth}</b>
                            <span>Growth</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Authentic Footer */}
          <Footer />
        </main>
      </div>

      {/* Interactive Startup Detail Modal */}
      <StartupModal
        startup={selectedStartup}
        onClose={() => setSelectedStartup(null)}
      />
    </div>
  );
}