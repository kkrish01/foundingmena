'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface AppbarProps {
  onSearchClick?: () => void;
}

export default function Appbar({ onSearchClick }: AppbarProps) {
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsStuck(true);
      } else {
        setIsStuck(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`appbar overhero ${isStuck ? 'stuck' : ''}`} id="appbar">
      <div className="abrow">
        <Link className="wmk" aria-label="Founding MENA" href="/">
          <img 
            src="https://qcmmrdyvzrooardtmwmx.supabase.co/storage/v1/object/public/media/brand/logos/logo_row.svg" 
            alt="Founding MENA"
            style={{ height: '26px', width: 'auto' }}
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
