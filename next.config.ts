
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
       {
        protocol: 'https',
        hostname: 'granadanatural.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ecestaticos.com',
      },
      {
        protocol: 'https',
        hostname: 'www.actualidadiphone.com',
      },
      {
        protocol: 'https',
        hostname: 'i0.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'tse3.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
      },
      {
        protocol: 'https',
        hostname: 'thinkmarketingmagazine.com',
      },
      {
        protocol: 'https',
        hostname: 'www.underconsideration.com',
      },
      {
        protocol: 'https',
        hostname: 'agqcvcudno.cloudimg.io',
      },
      {
        protocol: 'https',
        hostname: 'elviajerofeliz.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.e-konomista.pt',
      },
      {
        protocol: 'https',
        hostname: 'www.exploradorcurioso.com',
      },
      {
        protocol: 'https',
        hostname: 'www.apartamentos3000.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
      },
      {
        protocol: 'https',
        hostname: 's1.it.atcdn.net',
      },
      {
        protocol: 'https',
        hostname: 'www.escapadarural.com',
      },
       {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aemet.es',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'logovector.net',
      },
      {
        protocol: 'https',
        hostname: 'www.iessansebastian.com',
      },
      {
        protocol: 'https',
        hostname: 'static.actu.fr',
      },
      {
        protocol: 'https',
        hostname: 'seekvectorlogo.com',
      },
       {
        protocol: 'https',
        hostname: 'www.twice.com',
      },
       {
        protocol: 'https',
        hostname: 'ulefonepty.com',
      },
       {
        protocol: 'https',
        hostname: 'www.liblogo.com',
      },
      {
        protocol: 'https',
        hostname: 'lh4.googleusercontent.com',
      },
       {
        protocol: 'https',
        hostname: 'cdn.pacer.cc',
      },
      {
        protocol: 'https',
        hostname: 'www.fundacionaccesible.org',
      },
      {
        protocol: 'https',
        hostname: 'encuestas.juntadeandalucia.es',
      },
      {
        protocol: 'https',
        hostname: 'latestlogo.com',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
