import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: 'export', // Ensures static export
  basePath: "/portfolio.github.io", // Change to your repo name
  images: {
    unoptimized: true, // Since GitHub Pages doesn’t support Next.js image optimization
  },
};

export default nextConfig;
