const withPlugins = require('next-compose-plugins');
require('dotenv').config();

const nextConfig = {
  webpack(config) {
    config.module.rules.push(
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
    );

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
