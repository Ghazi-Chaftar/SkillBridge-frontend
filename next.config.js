/* eslint-disable @typescript-eslint/no-var-requires */
const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@lobehub/tts'],

  images: {
    domains: [
      process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
      'archimatchsg.blob.core.windows.net'
    ]
  },
  reactStrictMode: false,
  webpack: config => {
    // Ignore node-specific modules when bundling for the browser
    // https://webpack.js.org/configuration/resolve/#resolvealias
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      'onnxruntime-node$': false
    }
    return config
  }
}

module.exports = withNextIntl(nextConfig)
