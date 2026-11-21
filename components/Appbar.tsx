'use client';

import React from 'react';
import Link from 'next/link';

interface AppbarProps {
  onSearchClick?: () => void;
}

export default function Appbar({ onSearchClick }: AppbarProps) {
  return (
    <header className="appbar overhero" id="appbar">
      <div className="abrow">
        <Link className="wmk" aria-label="Founding MENA" href="/">
          <img 
            src="https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/logos/logo_row.svg" 
            alt="Founding MENA"
            style={{ height: '24px', width: 'auto' }}
          />
        </Link>
        <div className="sp"></div>
        {onSearchClick && (
          <button
            onClick={onSearchClick}
            className="chip mono"
            style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.08)', color: '#fff3e0' }}
          >
            Search DB
          </button>
        )}
      </div>
    </header>
  );
}
