'use client';

import React from 'react';
import NewsletterBanner from '@/components/NewsletterBanner';

export default function Footer() {
  return (
    <footer className="fmfoot" style={{ marginTop: '48px' }}>
      <NewsletterBanner />
      <nav className="fnav">
        <a href="/">Home</a>
        <a href="/the-30">The 30</a>
        <a href="/newsletter">Newsletter</a>
        <a href="/#countries">Countries</a>
        <a href="/#watch">Watch</a>
        <a href="/#articles">Articles</a>
        <a href="/#carousels">Carousels</a>
        <a href="/the-30">Companies</a>
        <a href="/the-30/founders">Founders</a>
        <a href="/#deals">Deals &amp; data</a>
        <a href="/#map">The map</a>
        <a href="/#about">About</a>
        <a href="/#contact">Contact</a>
      </nav>
      <div className="fmeta">
        <img 
          src="https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/logos/logo_row.svg" 
          alt="Founding MENA" 
          loading="lazy"
          decoding="async"
        />
        <span>© 2026 Himma Media</span>
        <span className="sp" />
        <span className="legal-links">
          <a href="#privacy">Privacy</a> ·{' '}
          <button type="button" className="linkish">Privacy choices</button> ·{' '}
          <a href="#terms">Terms</a> ·{' '}
          <a href="#ethics">Ethics</a>
        </span>
      </div>
    </footer>
  );
}
