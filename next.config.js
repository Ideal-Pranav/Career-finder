/** @type {import('next').NextConfig} */
// restart trigger
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'date-fns', 'lodash'],
  },
}

module.exports = nextConfig
