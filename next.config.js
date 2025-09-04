/* eslint-disable import/no-extraneous-dependencies */

// по умолчанию — no-op
let withBundleAnalyzer = (config) => config;

// подключаем пакет только если ANALYZE включён
if (process.env.ANALYZE === 'true') {
  // eslint-disable-next-line global-require
  const bundleAnalyzer = require('@next/bundle-analyzer');
  withBundleAnalyzer = bundleAnalyzer({ enabled: true });
}

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ['.'],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: '',
  reactStrictMode: true,
});
