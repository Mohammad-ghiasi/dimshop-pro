/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'aiobrhqkxhmnpzhljono.supabase.co', // 👈 دامنه supabase
      // بقیه دامنه‌هایی که استفاده می‌کنی هم اینجا می‌تونی بذاری
    ],
  },

  // swcMinify: true, // Minify JS

  // reactStrictMode: true, // React Strict Mode

  // output: 'standalone', // Static Output for SEO & Speed

  // experimental: {
  //   optimizeCss: true, // CSS Optimization
  // },

  // compiler: {
  //   removeConsole: process.env.NODE_ENV === "production", // حذف console.log
  // },

  // headers: async () => [
  //   {
  //     source: '/(.*)',
  //     headers: [
  //       {
  //         key: 'Cache-Control',
  //         value: 'public, max-age=31536000, immutable', // Caching Static Files
  //       },
  //     ],
  //   },
  // ],

  // pwa: {
  //   dest: "public", // PWA Support
  //   disable: process.env.NODE_ENV === "development",
  // },

  // Optionally preloading fonts
  // head: {
  //   link: [
  //     {
  //       rel: "preload",
  //       href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
  //       as: "font",
  //       type: "font/woff2",
  //       crossorigin: "anonymous",
  //     },
  //   ],
  // },
};

export default nextConfig;
