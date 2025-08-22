import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Facebook, Twitter, Instagram, Linkedin, MountainIcon, Home, Mail, Phone } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-gray-800 text-white text-center lg:text-left">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="mx-auto md:mx-0">
            <h6 className="uppercase font-bold mb-4 flex items-center justify-center md:justify-start gap-2">
              <MountainIcon />
              Alpine-Hike Club
            </h6>
            <p className="text-gray-400">
              {t('company_description')}
            </p>
          </div>

          {/* Useful Links */}
          <div className="mx-auto">
            <h6 className="uppercase font-bold mb-4">{t('useful_links_title')}</h6>
            <p className="mb-2">
              <Link href="/routes" className="text-gray-400 hover:text-white">{t('routes_link')}</Link>
            </p>
            <p className="mb-2">
              <Link href="/rules" className="text-gray-400 hover:text-white">{t('rules_link')}</Link>
            </p>
            <p className="mb-2">
              <Link href="/blog" className="text-gray-400 hover:text-white">{t('blog_link')}</Link>
            </p>
            <p>
              <Link href="/reviews" className="text-gray-400 hover:text-white">{t('reviews_link')}</Link>
            </p>
          </div>
          
           {/* Legal Links */}
          <div className="mx-auto">
            <h6 className="uppercase font-bold mb-4">{t('legal_title')}</h6>
            <p className="mb-2">
              <a href="#!" className="text-gray-400 hover:text-white">{t('privacy')}</a>
            </p>
            <p>
              <a href="#!" className="text-gray-400 hover:text-white">{t('terms')}</a>
            </p>
          </div>


          {/* Contact */}
          <div className="mx-auto">
            <h6 className="uppercase font-bold mb-4">{t('contact_title')}</h6>
            <p className="flex items-center justify-center md:justify-start mb-2 text-gray-400">
              <Home className="mr-3 h-5 w-5"/> Granada, España
            </p>
            <p className="flex items-center justify-center md:justify-start mb-2 text-gray-400">
              <Mail className="mr-3 h-5 w-5"/> info@alpinehike.com
            </p>
            <p className="flex items-center justify-center md:justify-start text-gray-400">
              <Phone className="mr-3 h-5 w-5"/> +34 123 456 789
            </p>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="text-center p-4 bg-black/20 text-gray-400 text-sm">
        {t('copyright')}
      </div>
    </footer>
  );
}
