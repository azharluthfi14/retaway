/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "uwslpioplrdholpotqvg.supabase.co",
      "uwslpioplrdholpotqvg.supabase.in",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
