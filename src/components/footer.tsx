import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Instagram, Home, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

// Custom SVG Icons for brands not in lucide-react
const WhatsappIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
);

const SpotifyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.19 14.19c-.21.32-.62.42-.94.21-2.55-1.55-5.76-1.89-9.51-1.04-.37.09-.7-.14-.79-.51-.09-.37.14-.7.51-.79 4.07-.91 7.6- .54 10.45 1.25.32.2.42.62.21.93zm.87-2.28c-.27.42-.8.55-1.22.28-2.9-1.78-7.18-2.31-10.46-1.27-.45.14-.94-.12-1.08-.57s.12-.94.57-1.08c3.73-1.17 8.44-.57 11.75 1.48.42.26.55.8.28 1.22zm.08-2.38c-3.48-2.07-9.1-2.27-12.72-1.25-.52.14-1.07-.18-1.21-.7s.18-1.07.7-1.21c4.13-1.14 10.33-.91 14.31 1.43.47.28.63.9.35 1.37-.28.47-.9.63-1.37.35z"/>
    </svg>
);

const StravaIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m10.33 21.31-6.6-10.25h5.11l1.49 2.3-1.49 2.31h3.38l-1.91 2.96zM15.31 3l-2.6 4.03h3.38l2.6-4.03h-3.38z"/>
    </svg>
);

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-900 text-white">
      {/* Social media section */}
      <div className="flex justify-center items-center lg:justify-between p-4 border-b border-gray-700">
        <div className="mr-12 hidden lg:block">
          <span>{t('social_connect')}</span>
        </div>
        <div className="flex justify-center">
          <a href="#!" className="mr-6 text-gray-400 hover:text-white">
            <WhatsappIcon />
          </a>
          <a href="#!" className="mr-6 text-gray-400 hover:text-white">
            <SpotifyIcon />
          </a>
          <a href="#!" className="mr-6 text-gray-400 hover:text-white">
            <StravaIcon />
          </a>
          <a href="#!" className="text-gray-400 hover:text-white">
            <Instagram />
          </a>
        </div>
      </div>

      {/* Links section */}
      <div className="container mx-auto p-6 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company info */}
          <div className="md:col-span-1">
            <h6 className="uppercase font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
              <Image 
                src="https://placehold.co/100x100.png" 
                alt="Club Logo"
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
                data-ai-hint="logo club"
              />
              Nazhari Realms GR
            </h6>
            <p className="text-gray-400 text-sm">
              {t('company_description')}
            </p>
          </div>

          {/* Useful & Legal Links */}
          <div>
            <h6 className="uppercase font-bold mb-4">{t('useful_links_title')}</h6>
            <p className="mb-2">
              <Link href="/routes" className="text-gray-400 hover:text-white text-sm">{t('routes_link')}</Link>
            </p>
            <p className="mb-2">
              <Link href="/rules" className="text-gray-400 hover:text-white text-sm">{t('rules_link')}</Link>
            </p>
            <p className="mb-2">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">{t('privacy')}</Link>
            </p>
            <p>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">{t('terms')}</Link>
            </p>
          </div>

          {/* Contact */}
          <div>
            <h6 className="uppercase font-bold mb-4">{t('contact_title')}</h6>
            <p className="flex items-center justify-center md:justify-start mb-2 text-gray-400 text-sm">
              <Home className="mr-3 h-5 w-5 flex-shrink-0"/> Granada, España
            </p>
            <p className="flex items-center justify-center md:justify-start mb-2 text-gray-400 text-sm">
              <Mail className="mr-3 h-5 w-5 flex-shrink-0"/> info@nazharirealms.com
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-400 text-sm">
              <Phone className="mr-3 h-5 w-5 flex-shrink-0"/> +34 123 456 789
            </p>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="text-center p-4 text-gray-400 text-xs bg-black/40">
        {t('copyright')}
      </div>
    </footer>
  );
}
