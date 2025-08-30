"use client";

import type { StravaEmbed } from '@/lib/trail-data';
import React, { useEffect } from 'react';

interface StravaEmbedProps {
  embed: StravaEmbed;
}

const StravaEmbedComponent: React.FC<StravaEmbedProps> = ({ embed }) => {
  useEffect(() => {
    const initStravaEmbed = () => {
      // The Strava script looks for and processes elements with the class 'strava-embed-placeholder'.
      // Calling init() re-scans the DOM for any new placeholders.
      if (window.Strava && window.Strava.Embeds) {
        window.Strava.Embeds.init();
      }
    };
    
    // Check if the Strava script is already on the page
    if (!document.querySelector('script[src="https://strava-embeds.com/embed.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://strava-embeds.com/embed.js';
      script.async = true;
      script.onload = initStravaEmbed;
      document.body.appendChild(script);
    } else {
      // If the script is already there, just run the init function
      // to process the new placeholder rendered by this component.
      initStravaEmbed();
    }
  }, []); // The empty dependency array ensures this effect runs once when the component mounts.

  return (
    <div
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
