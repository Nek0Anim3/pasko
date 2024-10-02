/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.telegram.org', 'res.cloudinary.com', 'paskocoin.vercel.app'], // Allow images from Telegram API
  },
};

export default nextConfig;
