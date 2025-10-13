import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Ignore les erreurs ESLint pendant le build
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "primary-production-e46f.up.railway.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "assets.aceternity.com",
      },
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "@tabler/icons-react",
      "lucide-react",
      "react-icons",
    ],
  },
  // Optimisation moderne pour réduire les polyfills
  swcMinify: true,
  // Améliorer la compression
  poweredByHeader: false,
  // Optimiser les performances
  reactStrictMode: true,
};

export default nextConfig;
