/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [require('remark-gfm')],
    rehypePlugins: [[require('rehype-prism-plus'), { showLineNumbers: true }]],
    providerImportSource: '@mdx-js/react',
  },
});

const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

module.exports = withMDX(nextConfig);
