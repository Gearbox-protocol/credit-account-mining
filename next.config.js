const withPlugins = require('next-compose-plugins');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
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

    if (process.env.NODE_ENV !== 'development') {
      config.plugins = config.plugins.filter((p) => p.constructor.name !== 'UglifyJsPlugin');
      config.plugins.push(
        new UglifyJsPlugin({
          test: /\.(ts|tsx|js)(\?.*)?$/i,
        }),
      );

      config.optimization.minimizer = [];
      config.optimization.minimizer.push(new TerserPlugin());
    }

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
