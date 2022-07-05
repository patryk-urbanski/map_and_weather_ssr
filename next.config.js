/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    WEATHER_API_KEY: 'bbd18bad27aa40d9b8b91915220507',
    STORAGE_API_KEY: '1eade97e039b4d10b87174f12ee29b9e',
  },
};

module.exports = nextConfig;
