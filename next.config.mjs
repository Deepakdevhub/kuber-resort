/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // <--- This fixes the "Private IP" error
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      }
    ],
  },
};

export default nextConfig;