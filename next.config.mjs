/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   turbopackFileSystemCacheForDev: true,
  // },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://uni-share.runasp.net/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/profile",
        destination: "/profile/tools",
        permanent: true, // أو false لو التغيير مؤقت
      },
    ];
  },
  /* config options here */
  cacheComponents: true,
  reactCompiler: true,
};

export default nextConfig;
