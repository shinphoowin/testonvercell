/** @type {import('next').NextConfig} */
/* https://github.com/vercel/next.js/issues/44430 */
const path = require('path')
const nextConfig = {
  //output: 'export',
  images: {
    domains: ["flagcdn.com"],
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
   eslint: {
   
    ignoreDuringBuilds: true,
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    }
  },
  //   env: {
//     NEXTAUTH_URL: process.env.NEXTAUTH_URL,
//     MONGODB_URI: process.env.MONGODB_URI,
//     NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET
//   },
};

module.exports = nextConfig;
