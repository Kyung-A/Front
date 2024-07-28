/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    disableStaticImages: true,
    domains: [
      "trivi407.s3.amazonaws.com",
      "trivi407.s3.us-east-1.amazonaws.com",
    ],
    minimumCacheTTL: 31536000,
  },
};

export default nextConfig;
