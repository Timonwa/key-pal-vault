/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    PASSAGE_APP_ID: process.env.PASSAGE_APP_ID,
    PASSAGE_API_KEY: process.env.PASSAGE_API_KEY,
  },
};

module.exports = nextConfig;
