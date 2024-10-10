/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./server/**/*"],
    },
  },
};

export default nextConfig;
