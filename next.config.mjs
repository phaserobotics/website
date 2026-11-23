/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is one static page. Export plain files into dist/, which is the
  // directory wrangler.jsonc serves as Worker assets.
  output: 'export',
  distDir: 'dist',
  images: { unoptimized: true },
}

export default nextConfig
