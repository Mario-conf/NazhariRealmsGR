"use client";

import type { StravaEmbed } from '@/lib/trail-data';
import React, { useEffect, useRef } from 'react';

interface StravaEmbedProps {
  embed: StravaEmbed;
}

const StravaEmbedComponent: React.FC<StravaEmbedProps> = ({ embed }) => {
  const embedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initStravaEmbed = () => {
      if (window.Strava && window.Strava.Embeds) {
        window.Strava.Embeds.init();
      }
    };
    
    // Check if the Strava script is already loaded
    if (!document.querySelector('script[src="https://strava-embeds.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      script.onload = initStravaEmbed;
      document.body.appendChild(script);
    } else {
        // If script is already there, Strava's embed script might need a nudge
        // to process new placeholders, especially on component remount.
        initStravaEmbed();
    }
  }, [embed]); // Re-run effect if the embed data changes

  return (
    <div
      ref={embedRef}
      className="strava-embed-placeholder"
      data-embed-type={embed.type}
      data-embed-id={embed.id}
      data-units={embed.units || 'metric'}
      data-style={embed.style || 'standard'}
      {...(embed.mapHash && { 'data-map-hash': embed.mapHash })}
      data-from-embed="true"
    ></div>
  );
};

// Extend Window interface to include Strava object
declare global {
    interface Window {
        Strava?: {
            Embeds: {
                init: () => void;
            }
        }
    }
}


export default StravaEmbedComponent;
