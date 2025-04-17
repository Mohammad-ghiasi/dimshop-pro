/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Image Optimization برای WebP و AVIF
  images: {
    formats: ["image/webp", "image/avif"],
    domains: [], // اگر عکس از دامنه خاصی لود می‌کنی
  },

  // ✅ Webpack config برای SVG
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  // ✅ Minify و بهینه‌سازی JS
  swcMinify: true,

  // ✅ React Strict Mode
  reactStrictMode: true,

  // ✅ Static Output برای بهبود SEO و سرعت
  output: 'standalone',

  // ✅ فعال‌سازی بهینه‌سازی CSS
  experimental: {
    optimizeCss: true,
  },

  // ✅ حذف console.log در production
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
