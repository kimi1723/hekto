/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./public/data/*"],
    },
  },
};

export default nextConfig;
