/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'aiobrhqkxhmnpzhljono.supabase.co',
      // 👇 این یکی رو دوبار گذاشته بودی، پاکش کردم که مرتب شه
      // بقیه دامنه‌ها رو هم اینجا می‌تونی اضافه کنی
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
