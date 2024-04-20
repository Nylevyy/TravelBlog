const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

const { env } = process;
const mode = env.NODE_ENV || 'development';
const isEnvProd = mode === 'production';
const port = env.PORT || '3000';
const host = env.HOST || '0.0.0.0';
const publicUrl = env.PUBLIC_URL || '';

module.exports = () => {
  const plugins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      ...(isEnvProd && {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    }),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      PUBLIC_URL: publicUrl,
    }),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/public'), to: publicUrl },
      ],
    }),
    new StyleLintPlugin({
      fix: true,
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ];

  let config = {
    mode,
    context: process.cwd(),
    entry: {
      polyfill: '@babel/polyfill',
      index: './src/index.js',
    },
    output: {
      path: path.resolve(__dirname, './build/'),
      publicPath: '/',
    },
    plugins,
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            fix: true,
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'dashes',
                  mode: 'local',
                  localIdentName: '[path]-[local]',
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                prependData: '@import "./src/assets/scss/variables/index.scss";',
              },
            },
          ],
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          type: 'asset/resource',
          exclude: [
            /node_modules/,
            path.resolve(__dirname, 'src/components/svg'),
          ],
          generator: {
            filename: 'assets/images/[name].[ext]',
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          type: 'asset/resource',
          exclude: /node_modules/,
          generator: {
            filename: 'assets/fonts/[name].[ext]',
          },
        },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          include: path.resolve(__dirname, 'src/components/svg'),
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src/'),
      },
      extensions: ['.json', '.js'],
    },
    devServer: {
      port,
      host,
      open: false,
      hot: true,
      allowedHosts: 'all',
      historyApiFallback: true,
      onListening(devServer) {
        const { port } = devServer.options;
        console.log('\x1b[36m%s\x1b[0m', `Starting the development server on port: ${port}\n`);
      },
      client: {
        logging: 'verbose',
        progress: true,
      },
      devMiddleware: {
        publicPath: '/',
        stats: 'minimal',
      },
    },
    performance: {
      hints: false,
    },
    devtool: 'eval-source-map',
  };

  if (isEnvProd) {
    config = {
      ...config,
      devtool: 'source-map',
      plugins: plugins.concat([
        new webpack.LoaderOptionsPlugin({
          minimize: true,
        }),
      ]),
    };
  }
  return config;
};
