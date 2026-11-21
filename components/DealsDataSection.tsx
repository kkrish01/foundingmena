'use client';

import React from 'react';

export default function DealsDataSection() {
  return (
    <section className="section" id="deals" aria-labelledby="dm-spot-h">
      <div className="sechead">
        <a style={{ display: 'contents' }} href="#deals">
          <h3 id="dm-spot-h">Deals & data</h3>
          <span className="cv">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
              <path d="M9 5l7 7-7 7"></path>
            </svg>
          </span>
        </a>
      </div>

      <div 
        className="data-module__NYeKAW__spot"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginTop: '16px'
        }}
      >
        {/* Card 1: Lead Total $2.24bn with Dune Texture & Wave */}
        <article
          className="data-module__NYeKAW__card data-module__NYeKAW__dune data-module__NYeKAW__k_lead"
          style={{
            position: 'relative',
            borderRadius: '16px',
            padding: '28px',
            background: '#3a1d10 url(/textures/tex-sun.webp) 50%/cover',
            color: '#fff3e0',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '260px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.6)'
          }}
        >
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h4 className="data-module__NYeKAW__tag" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f9bf43', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              <i style={{ width: '8px', height: '8px', background: '#f9bf43', borderRadius: '2px', display: 'inline-block' }}></i>
              Spotlight · Deals and data
            </h4>

            <div style={{ fontSize: '42px', fontWeight: 800, color: '#fff3e0', marginTop: '12px', lineHeight: 1, fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              $2.24bn
            </div>

            <p style={{ color: 'rgba(255,243,224,0.85)', fontSize: '13px', marginTop: '10px', lineHeight: 1.4, maxWidth: '280px' }}>
              raised by MENA startups from January to August, across 294 rounds.{' '}
              <span style={{ color: '#ea7648', fontWeight: 700 }}>▼ 29%</span> on last year
            </p>
          </div>

          <div style={{ position: 'relative', zIndex: 1, marginTop: '20px' }}>
            <a 
              href="#deals" 
              className="btn" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#e8862f',
                color: '#100c08',
                fontWeight: 700,
                fontSize: '12px',
                padding: '8px 14px',
                borderRadius: '6px',
                textDecoration: 'none'
              }}
            >
              See the report →
            </a>
          </div>
        </article>

        {/* Card 2: Fintech $375m with Sparkline */}
        <article
          className="data-module__NYeKAW__card"
          style={{
            position: 'relative',
            borderRadius: '16px',
            padding: '28px',
            background: '#17110c',
            color: '#fff3e0',
            border: '1px solid rgba(255,243,224,0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '260px'
          }}
        >
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f9bf43', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              <i style={{ width: '8px', height: '8px', background: '#f9bf43', borderRadius: '2px', display: 'inline-block' }}></i>
              Fintech · Jan to Aug
            </h4>

            <div style={{ fontSize: '38px', fontWeight: 800, color: '#fff3e0', marginTop: '12px', lineHeight: 1, fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              $375m
            </div>

            <p style={{ color: 'rgba(255,243,224,0.7)', fontSize: '13px', marginTop: '10px', lineHeight: 1.4 }}>
              Fintech led with $375m across 61 rounds, followed by retail with $312m across 42 rounds.
            </p>
          </div>

          <div>
            {/* Sparkline Wave */}
            <svg viewBox="0 0 200 40" width="100%" height="40" style={{ margin: '10px 0' }}>
              <path
                d="M0 35 Q30 32, 60 25 T120 18 T160 8 T200 15"
                fill="none"
                stroke="#f9bf43"
                strokeWidth="2.5"
              />
              <circle cx="160" cy="8" r="4" fill="#f9bf43" />
            </svg>

            <a 
              href="#sectors" 
              style={{
                color: '#fff3e0',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              The sectors →
            </a>
          </div>
        </article>

        {/* Card 3: UAE 71% with Bar Visualizer */}
        <article
          className="data-module__NYeKAW__card"
          style={{
            position: 'relative',
            borderRadius: '16px',
            padding: '28px',
            background: '#17110c',
            color: '#fff3e0',
            border: '1px solid rgba(255,243,224,0.12)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '260px'
          }}
        >
          <div>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f9bf43', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>
              <i style={{ width: '8px', height: '8px', background: '#f9bf43', borderRadius: '2px', display: 'inline-block' }}></i>
              UAE · Jan to Aug
            </h4>

            <div style={{ fontSize: '38px', fontWeight: 800, color: '#fff3e0', marginTop: '12px', lineHeight: 1, fontFamily: 'Bricolage Grotesque, sans-serif' }}>
              71%
            </div>

            <p style={{ color: 'rgba(255,243,224,0.7)', fontSize: '13px', marginTop: '10px', lineHeight: 1.4 }}>
              71% of total regional capital went to startups in the UAE: $1.59bn of $2.24bn.
            </p>
          </div>

          <div>
            {/* Progress Segment Bar */}
            <div style={{ height: '14px', borderRadius: '4px', overflow: 'hidden', display: 'flex', margin: '14px 0' }}>
              <div style={{ width: '71%', background: 'linear-gradient(90deg, #f9bf43, #ea7648)' }}></div>
              <div style={{ width: '29%', background: 'rgba(255,255,255,0.15)' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '8px' }}>
              <span>UAE (71%)</span>
              <span>Rest of MENA (29%)</span>
            </div>

            <a 
              href="#countries" 
              style={{
                color: '#fff3e0',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              The countries →
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
