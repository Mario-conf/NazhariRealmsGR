
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

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
        hostname: 'www.aemet.es',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.simpleicons.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
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
        hostname: 'tse3.mm.bing.net',
      },
      {
        protocol: 'https',
        hostname: 'static.actu.fr',
      },
      {
        protocol: 'https',
        hostname: 'thinkmarketingmagazine.com',
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
      }
    ],
  },
};

export default withNextIntl(nextConfig);

    