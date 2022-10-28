/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  assetPrefix: '/evangerypt',
  basePath: '/evangerypt',
  trailingSlash: true,
  exportPathMap: async function () {
    return {
      '/': { page: '/' }
    }
  }
}

module.exports = nextConfig
