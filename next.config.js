/* eslint-disable no-unused-vars */
const { i18n: i18nConfig } = require("./next-i18next.config");
const path = require("path");

module.exports = {
  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'it',
    localeDetection: false
  },

  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "./src/assets/scss")],
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coin-images.coingecko.com',
      },
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.ignoreWarnings = [
      {
        message:
          /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
      },
    ];
    return config;
  },
};
