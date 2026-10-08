/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      { source: '/about', destination: '/About' },
      { source: '/how-it-works', destination: '/Howitworks' },
      { source: '/howitworks', destination: '/Howitworks' },
      { source: '/documentation', destination: '/Documentation' },
      { source: '/contact', destination: '/Contact' },
      { source: '/login', destination: '/Login' },
      { source: '/signup', destination: '/register' },
    ];
  },
};

export default nextConfig;
