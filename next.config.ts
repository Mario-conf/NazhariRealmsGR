import type {NextConfig} from 'next';
require('dotenv').config();

const withNextIntl = require('next-intl/plugin')();

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
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.aemet.es',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
