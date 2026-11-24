'use client';

import React from 'react';

export default function NewsletterBanner() {
  return (
    <div className="fnl nl-card nl-sun">
      <div className="fnl-l">
        <img
          className="fnl-mark"
          loading="lazy"
          decoding="async"
          src="/marks/fm-stack-left.svg"
          alt="Founding MENA"
          width="150"
          height="71"
        />
        <div>
          <span className="nl-eyebrow">The newsletter</span>
          <b>The region’s tech news, in your inbox.</b>
        </div>
      </div>
      <div className="nlf nlout nl-sand">
        <a
          className="btn nl-btn"
          href="https://foundingmena.substack.com/subscribe"
          target="_blank"
          rel="noopener"
        >
          Subscribe
        </a>
        <span className="note">Free, on Substack.</span>
      </div>
    </div>
  );
}
