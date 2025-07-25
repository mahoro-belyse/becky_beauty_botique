/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placeholder.svg"],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
