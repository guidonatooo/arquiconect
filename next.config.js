const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // The src/ directory contains legacy Vite/React source files that are
    // not part of this Next.js app. Return empty modules for all of them
    // to prevent build errors from missing dependencies (react-router-dom, etc).
    config.module.rules.push({
      test: /\.[jt]sx?$/,
      include: path.resolve(__dirname, 'src'),
      enforce: 'pre',
      loader: path.resolve(__dirname, 'lib/empty-loader.js'),
    })
    return config
  },
}

module.exports = nextConfig
