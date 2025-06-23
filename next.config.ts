/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_APPLY_ENABLED: process.env.NEXT_PUBLIC_APPLY_ENABLED || 'false',
  },
};

module.exports = nextConfig;