/* eslint-disable import/no-extraneous-dependencies */
const { createRequire } = require('module');

const requireModule = createRequire(import.meta.url);

// по умолчанию no-op
let withBundleAnalyzer = (config) => config;

if (process.env.ANALYZE === 'true') {
  const bundleAnalyzer = requireModule('@next/bundle-analyzer');
  withBundleAnalyzer = bundleAnalyzer({ enabled: true });
}

module.exports = withBundleAnalyzer({
  eslint: { dirs: ['.'] },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
});
