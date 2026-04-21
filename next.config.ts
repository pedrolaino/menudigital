import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        // Supabase Storage — will be filled with actual project URL
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
