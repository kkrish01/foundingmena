'use client';

import React from 'react';

export default function NewsletterBanner() {
  return (
    <section className="section" style={{ marginTop: '24px', marginBottom: '8px' }}>
      <div 
        className="fnl nl-card nl-sun"
        style={{
          borderRadius: '16px',
          background: 'linear-gradient(100deg, #3a1d10 0%, #683018 45%, #2a140b 100%)',
          padding: '20px 28px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          border: '1px solid rgba(255,243,224,0.15)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.4)'
        }}
      >
        <div className="fnl-l" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <img 
            className="fnl-mark" 
            src="/marks/fm-stack-left.svg" 
            alt="Founding MENA" 
            width="130" 
            height="60"
            style={{ height: '44px', width: 'auto' }}
          />
          <div>
            <span 
              className="nl-eyebrow" 
              style={{
                display: 'block',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#f9bf43'
              }}
            >
              The newsletter
            </span>
            <b style={{ fontSize: '17px', color: '#fff3e0', fontWeight: 700 }}>
              The region’s tech news, in your inbox.
            </b>
          </div>
        </div>

        <div className="nlf nlout nl-sand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="email"
            placeholder="Your work email..."
            style={{
              padding: '9px 14px',
              borderRadius: '6px',
              background: 'rgba(16,12,8,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#fff3e0',
              fontSize: '12.5px',
              outline: 'none',
              minWidth: '200px'
            }}
          />
          <button
            type="button"
            className="btn nl-btn"
            style={{
              background: '#e8862f',
              color: '#100c08',
              fontWeight: 800,
              fontSize: '11.5px',
              padding: '10px 18px',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '0.08em'
            }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
