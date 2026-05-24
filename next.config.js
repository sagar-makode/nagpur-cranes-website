/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Enables simple deployments on standard platforms like Netlify/Vercel without configuring advanced image loaders.
    qualities: [75, 90, 100],
  },
  async redirects() {
    return [
      {
        source: "/aboutus",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/contactus",
        destination: "/contact",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
