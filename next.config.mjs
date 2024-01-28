/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "energetic-hedgehog-470.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
