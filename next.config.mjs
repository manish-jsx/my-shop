// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
  },
  transpilePackages: ["@nextui-org/react"],
  reactStrictMode: true,
  swcMinify: true,
}

export default nextConfig

