/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [{ source: "/who-is-me", destination: "/api/who-is-me" }];
  },
};

module.exports = nextConfig;
