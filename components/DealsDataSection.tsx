'use client';

import React from 'react';

export default function DealsDataSection() {
  return (
    <section className="section" id="deals" aria-labelledby="dm-spot-h">
      <div className="sechead">
        <a style={{ display: 'contents' }} href="/deals">
          <h3 id="dm-spot-h">Deals &amp; data</h3>
          <span className="cv">
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              aria-hidden="true"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </a>
      </div>

      <div className="data-module__NYeKAW__spot">
        {/* Card 1: Lead Total $2.24bn with Dune Silhouette & Peaks Line */}
        <article
          className="data-module__NYeKAW__card data-module__NYeKAW__dune data-module__NYeKAW__k_lead data-module__NYeKAW__z_l"
          aria-label="$2.24bn raised by MENA startups from January to August, across 294 rounds, down 29% on the same months last year."
        >
          <h4 className="data-module__NYeKAW__tag">
            <i aria-hidden="true" />
            Spotlight · Deals and data
          </h4>

          <b className="data-module__NYeKAW__v">$2.24bn</b>

          <p className="data-module__NYeKAW__d">
            raised by MENA startups from January to August, across 294 rounds.{' '}
            <span className="data-module__NYeKAW__down">▼ 29%</span> on last year
          </p>

          <div className="data-module__NYeKAW__row">
            <a
              href="/deals?period=ytd#overview"
              className="btn"
              aria-label="See the data: $2.24bn raised by MENA startups from January to August, across 294 rounds, down 29% on the same months last year."
            >
              See the data →
            </a>
          </div>

          <div className="data-module__NYeKAW__bleedBig">
            <svg
              className="dm-area"
              viewBox="0 0 600 130"
              preserveAspectRatio="none"
              width="100%"
              height={130}
              aria-hidden="true"
            >
              <defs>
                <pattern id="sun_S_1_" patternUnits="userSpaceOnUse" width="600" height="130">
                  <image href="/textures/tex-sun-bar.webp" width="600" height="130" preserveAspectRatio="none" />
                </pattern>
                <pattern id="sand_S_1_" patternUnits="userSpaceOnUse" width="600" height="130">
                  <image href="/textures/tex-sand.webp" width="600" height="130" preserveAspectRatio="none" />
                </pattern>
                <linearGradient id="glow_S_1_" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="600" y2="0">
                  <stop offset="0" stopColor="#E8692F" />
                  <stop offset=".5" stopColor="#F08F3A" />
                  <stop offset="1" stopColor="#F9BF43" />
                </linearGradient>
              </defs>
              <polyline
                points="0.0,4.0 85.7,56.2 171.4,108.0 257.1,93.7 342.9,85.1 428.6,118.6 514.3,15.3 600.0,78.3"
                fill="none"
                stroke="#E8D5B5"
                strokeOpacity={0.55}
                strokeWidth={1.6}
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0,130 L0.0,46.4 L85.7,79.8 L171.4,119.2 L257.1,104.8 L342.9,61.7 L428.6,105.0 L514.3,101.6 L600.0,73.0 L600,130 Z"
                fill="url(#sun_S_1_)"
              />
              <polyline
                points="0.0,46.4 85.7,79.8 171.4,119.2 257.1,104.8 342.9,61.7 L428.6,105.0 L514.3,101.6 L600.0,73.0"
                fill="none"
                stroke="#F9BF43"
                strokeWidth={2.4}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </article>

        {/* Card 2: August 2026 $375m with Sparkline */}
        <article
          className="data-module__NYeKAW__card data-module__NYeKAW__z_m"
          aria-label="August 2026: $375m raised across 27 rounds."
        >
          <h4 className="data-module__NYeKAW__tag">
            <i aria-hidden="true" />
            August 2026
          </h4>

          <b className="data-module__NYeKAW__v">$375m</b>

          <p className="data-module__NYeKAW__d">across 27 rounds, 97% of it in the UAE.</p>

          <div className="data-module__NYeKAW__row">
            <a
              href="/deals?month=2026-08#monthly"
              className="btn g"
              aria-label="The month: August 2026: $375m raised across 27 rounds."
            >
              The month →
            </a>
          </div>

          <div className="data-module__NYeKAW__bleed">
            <svg
              className="dm-spark"
              viewBox="0 0 300 70"
              preserveAspectRatio="none"
              width="100%"
              height={70}
              aria-hidden="true"
            >
              <polyline
                points="0.0,3.0 27.3,24.8 54.5,30.4 81.8,24.1 109.1,25.5 136.4,11.4 163.6,43.1 190.9,36.0 218.2,31.8 245.5,26.2 272.7,23.4 300.0,36.0"
                fill="none"
                stroke="#F9BF43"
                strokeWidth={1.8}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </article>

        {/* Card 3: UAE 71% with Segmented Bar */}
        <article
          className="data-module__NYeKAW__card data-module__NYeKAW__z_m"
          aria-label="71% of the money raised from January to August went to startups in the UAE: $1.59bn of $2.24bn."
        >
          <h4 className="data-module__NYeKAW__tag">
            <i aria-hidden="true" />
            UAE · Jan to Aug
          </h4>

          <b className="data-module__NYeKAW__v">71%</b>

          <p className="data-module__NYeKAW__d">71% of it went to the UAE: $1.59bn of $2.24bn.</p>

          <div className="data-module__NYeKAW__row">
            <a
              href="/deals?country=uae#countries"
              className="btn g"
              aria-label="The countries: 71% of the money raised from January to August went to startups in the UAE: $1.59bn of $2.24bn."
            >
              The countries →
            </a>
          </div>

          <div className="data-module__NYeKAW__shareW">
            <svg
              className="dm-share"
              viewBox="0 0 300 18"
              preserveAspectRatio="none"
              width="100%"
              height={18}
              aria-hidden="true"
            >
              <defs>
                <pattern id="sun_S_2_" patternUnits="userSpaceOnUse" width="300" height="18">
                  <image href="/textures/tex-sun-bar.webp" width="300" height="18" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <pattern id="sand_S_2_" patternUnits="userSpaceOnUse" width="300" height="18">
                  <image href="/textures/tex-sand.webp" width="300" height="18" preserveAspectRatio="xMidYMid slice" />
                </pattern>
                <linearGradient id="glow_S_2_" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="300" y2="0">
                  <stop offset="0" stopColor="#E8692F" />
                  <stop offset=".5" stopColor="#F08F3A" />
                  <stop offset="1" stopColor="#F9BF43" />
                </linearGradient>
              </defs>
              <rect x={0} y={0} width={300} height={18} rx={4} fill="url(#sand_S_2_)" opacity={0.4} />
              <rect x={0} y={0} width={212.46872766261617} height={18} rx={4} fill="url(#sun_S_2_)" />
            </svg>
            <span className="data-module__NYeKAW__shareK">
              <i />
              UAE
              <em />
              The rest
            </span>
          </div>
        </article>
      </div>
    </section>
  );
}
