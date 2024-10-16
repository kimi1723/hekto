/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/": ["./tmp/data/*"],
    },
  },
};

export default nextConfig;
