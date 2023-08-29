/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['storage.googleapis.com', "media.nedigital.sg", 'target.scene7.com'],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'storage.googleapis.com',
    //     port: '',
    //     pathname: '*',
    //   },
    // ],
  },
};

module.exports = nextConfig;
