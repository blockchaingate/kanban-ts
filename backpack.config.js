'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./src/index.ts'];

    config.resolve = {
      extensions: ['.ts', '.js', '.json'],
    };

    config.plugins.push(
      new CopyWebpackPlugin(
        [
          {
            from: 'src/common/swagger/Api.yaml',
            to: 'src/common/swagger/Api.yaml',
          },
        ],
        options
      )
    );

    config.module.rules.push({
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
    });

    return config;
  },
};
