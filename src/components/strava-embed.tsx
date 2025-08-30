"use client";

import type { StravaEmbed } from '@/lib/trail-data';
import React, { useEffect } from 'react';

interface StravaEmbedProps {
  embed: StravaEmbed;
}

const StravaEmbedComponent: React.FC<StravaEmbedProps> = ({ embed }) => {
  useEffect(() => {
    // This function will handle loading the script and initializing the embeds
    const loadStravaEmbed = () => {
      if (window.Strava && window.Strava.Embeds) {
        // If the script is already loaded, just initialize new embeds
        window.Strava.Embeds.init();
      } else if (!document.querySelector('script[src="https://strava-embeds.com/embed.js"]')) {
        // If the script is not loaded, create and append it
        const script = document.createElement('script');
        script.src = 'https://strava-embeds.com/embed.js';
        script.async = true;
        // The script will automatically call its init function once loaded
        document.body.appendChild(script);
      }
    };
    
    // Call the function to ensure the widget is loaded
    loadStravaEmbed();
    
    // Cleanup function: This is important for single-page applications.
    // It will run when the component unmounts (e.g., when the dialog is closed).
    return () => {
        const stravaIframe = document.querySelector(`.strava-embed-placeholder[data-embed-id='${embed.id}'] iframe`);
        if (stravaIframe) {
             stravaIframe.remove();
        }
    };

  }, [embed.id]); // The effect re-runs if the embed ID changes.

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
