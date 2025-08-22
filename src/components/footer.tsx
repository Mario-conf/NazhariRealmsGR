import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Facebook, Twitter, Instagram, Linkedin, Home, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-800 text-white">
      {/* Social media section */}
      <div className="flex justify-center items-center lg:justify-between p-4 border-b border-gray-700">
        <div className="mr-12 hidden lg:block">
          <span>{t('social_connect')}</span>
        </div>
        <div className="flex justify-center">
          <a href="#!" className="mr-6 text-gray-400 hover:text-white">
            <Facebook />
          </a>
          <a href="#!" className="mr-6 text-gray-400 hover:text-white">
            <Twitter />
          </a>
          <a href="#!" className="mr-6 text-gray-400 hover:text-white">
            <Instagram />
          </a>
          <a href="#!" className="text-gray-400 hover:text-white">
            <Linkedin />
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
      <div className="text-center p-4 text-gray-400 text-xs">
        {t('copyright')}
      </div>
    </footer>
  );
}
