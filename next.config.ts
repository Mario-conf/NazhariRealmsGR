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
      }
    ],
  },
};

export default withNextIntl(nextConfig);
