/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const nextConfig = {
  reactStrictMode: true,
  compress: true,
};

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: false, // Nosotros registramos el SW manualmente
  skipWaiting: true,
};

export default withPWA(pwaConfig)(nextConfig);