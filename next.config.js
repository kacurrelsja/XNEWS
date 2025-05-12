/* eslint-disable no-unused-vars */
const { i18n } = require("./next-i18next.config");
const path = require("path");

module.exports = { 
   
    i18n,
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
        // eslint-disable-next-line no-param-reassign
        config.ignoreWarnings = [
            {
                message:
                    /(magic-sdk|@walletconnect\/web3-provider|@web3auth\/web3auth)/,
            },
        ];
        return config;
    },
};
