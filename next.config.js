/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "uwslpioplrdholpotqvg.supabase.co",
      "uwslpioplrdholpotqvg.supabase.in",
    ],
  },
};

module.exports = nextConfig;
