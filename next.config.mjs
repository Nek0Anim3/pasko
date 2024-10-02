/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.telegram.org', 'localhost', 'paskocoin.vercel.app'], // Allow images from Telegram API
  },
};

export default nextConfig;
