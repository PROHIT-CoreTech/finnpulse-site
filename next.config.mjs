/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ['image/avif', 'image/webp'] },
  // For a fully static host (S3 / Netlify drop / cPanel), uncomment:
  // output: 'export', images: { unoptimized: true },
};
export default nextConfig;
