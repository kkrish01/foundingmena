'use client';

import React from 'react';
import { Country, Sector } from '@/lib/api';

interface CountriesSectorsProps {
  countries: Country[];
  sectors: Sector[];
  onSelectCountry?: (slug: string) => void;
  onSelectSector?: (slug: string) => void;
}

export default function CountriesSectors({
  countries,
  sectors,
  onSelectCountry,
  onSelectSector,
}: CountriesSectorsProps) {
  return (
    <section className="section csec" id="countries">
      <div className="sechead">
        <h3>Countries &amp; Sectors</h3>
      </div>

      {/* Indian Cities Tag Rail */}
      <div className="tagrail" aria-label="Cities">
        {countries.map((country) => (
          <a
            key={country.slug}
            className="tag"
            href={`#${country.slug}`}
            onClick={(e) => {
              if (onSelectCountry) {
                e.preventDefault();
                onSelectCountry(country.slug);
              }
            }}
          >
            <span className="fl">
              <img
                className="flg"
                src={country.flagSvg}
                alt={country.name}
                loading="lazy"
              />
            </span>
            <span>{country.name}</span>
          </a>
        ))}
      </div>

      {/* Sectors Tag Rail */}
      <div className="tagrail csec2" aria-label="Sectors">
        {sectors.map((sector) => (
          <a
            key={sector.slug}
            className="tag"
            href={`#${sector.slug}`}
            onClick={(e) => {
              if (onSelectSector) {
                e.preventDefault();
                onSelectSector(sector.slug);
              }
            }}
          >
            <span
              className="sw"
              style={{ background: sector.gradient }}
            ></span>
            <span>{sector.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
