'use client';

import React from 'react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="tabs" id="tabs" aria-label="Primary">
      <Link className="tlogo" aria-label="Founding MENA, home" href="/">
        <img 
          src="/marks/fm-stack-cream-sunset.svg" 
          alt="Founding MENA" 
          width="150" 
          height="71" 
        />
      </Link>

      <Link className="thome on" href="/">
        <i className="tico star" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
          </svg>
        </i>
        <span>Home</span>
      </Link>

      <Link className="" href="#the-30">
        <i className="tico bird" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M12 2L4 6v12l8 4 8-4V6l-8-4z"></path>
          </svg>
        </i>
        <span>Founding 30</span>
      </Link>

      <Link className="" href="#search">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.25">
          <path d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zM15.5 15.5 21 21"></path>
        </svg>
        <span>Search</span>
      </Link>

      <div className="side2" aria-label="More">
        <a className="s2" href="#watch">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M3 6h18v12H3zM10 9l5 3-5 3z"></path>
          </svg>
          <span>Watch</span>
        </a>

        <a className="s2" href="#articles">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M4 4.5h13v15H4zM17 8.5h3v11h-3M7 8h7M7 11.5h7M7 15h4"></path>
          </svg>
          <span>Articles</span>
        </a>

        <a className="s2" href="#the-30">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M5 20V4h9v16M14 9h5v11M3 20h18M8 7.5h3M8 11h3M8 14.5h3M16 12.5h1.5M16 16h1.5"></path>
          </svg>
          <span>Companies</span>
        </a>

        <a className="s2" href="#the-30-founders">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M12 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 21a8 8 0 0 1 16 0"></path>
          </svg>
          <span>Founders</span>
        </a>

        <a className="s2" href="#countries">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"></path>
          </svg>
          <span>Countries</span>
        </a>

        <a className="s2" href="#deals">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M4 19V5M4 19h16M7 15l4-5 3 3 6-8M17 5h3v3"></path>
          </svg>
          <span>Deals and data</span>
        </a>

        <a className="s2" href="#about">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 10.5V17M12 7v2.25"></path>
          </svg>
          <span>About</span>
        </a>

        <a className="s2" href="#contact">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25">
            <path d="M4 5h16v11H10l-6 4.5z"></path>
          </svg>
          <span>Contact</span>
        </a>
      </div>

      <button type="button" className="menub" aria-label="Menu">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.25">
          <path d="M4 7h16M4 12h16M4 17h16"></path>
        </svg>
        <span>Menu</span>
      </button>

      <a className="btn nlcta" href="#newsletter">
        Read the newsletter
      </a>
    </nav>
  );
}
