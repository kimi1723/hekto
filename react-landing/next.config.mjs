/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/api/another": ["./server/**/*"],
    },
  },
};

export default nextConfig;
