
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.herrajesinnova.com',
      'localhost',
      'placekitten.com',
      'http2.mlstatic.com',
      "encrypted-tbn0.gstatic.com",
      "www.api.platvialum.com",
      'dreamcosupplies.com',
      "herrajesbuseco.com",
      "www.herrajesdelcaribe.com.mx",
      "michapa.com.mx", 
      "eruwebsite.s3.amazonaws.com" // Example external domain for placeholder images
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;