// next.config.mjs
import { defineConfig } from 'next'

const nextConfig = defineConfig({
  experimental: {
    appDir: true,
    turbo: false // disable Turbopack
  },
  reactStrictMode: true,
})

export default nextConfig