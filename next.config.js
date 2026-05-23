/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Enables simple deployments on standard platforms like Netlify/Vercel without configuring advanced image loaders.
    qualities: [75, 90, 100],
  },
};

module.exports = nextConfig;
