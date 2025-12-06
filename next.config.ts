/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    // Define path patterns and specific paths
    const redirectSources = [
      '/products',
      '/products/:path*', // Redirects /products/anything/else
      '/solutions',
      '/about',
      '/contact',
      '/team',
      '/careers',
      '/docs',
      '/support',
      '/privacy',
      '/terms',
      '/security'
    ];

    const redirectRules = redirectSources.map(source => ({
      source,
      destination: '/disclaimer',
      permanent: true,
    }));

    return redirectRules;
  },
};

export default nextConfig;