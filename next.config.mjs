/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Use 'http' for localhost
        hostname: 'localhost', // Allow localhost as the hostname
        port: '8080', // Specify the port if your images are served on localhost:8080
        pathname: '/**', // Allow any path under localhost
      },
    ],
  },
  output: 'standalone',
}

export default nextConfig
