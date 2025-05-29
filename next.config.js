/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "lh3.googleusercontent.com",
      "s3.us-west-2.amazonaws.com"
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000"],
      bodySizeLimit: "2mb"
    }
  }
}

module.exports = nextConfig