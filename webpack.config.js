const path = require('path');
const {
  addPlugins, createConfig, entryPoint, env, setOutput, sourceMaps, defineConstants, webpack,
  customConfig,
} = require('@webpack-blocks/webpack2');
const babel = require('@webpack-blocks/babel6');
const WebpackMd5Hash = require('webpack-md5-hash');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = path.resolve(__dirname, 'dist');
const publicPath = '/';

const config = createConfig([
  setOutput({
    filename: '[name].[hash].js',
    path: outputPath,
    publicPath,
  }),
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,
  }),
  babel(),
  addPlugins([
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'templates/index.html'),
    }),
  ]),
  customConfig({
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      modules: [
        path.resolve(__dirname, 'src'),
        'node_modules',
      ],
    },
  }),

  env('development', [
    entryPoint([
      'webpack-hot-middleware/client',
      './src/index',
    ]),
    sourceMaps(),
    addPlugins([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
    ]),
  ]),

  env('production', [
    entryPoint('./src/index'),
    setOutput({
      filename: '[name].[chunkHash].js',
      path: outputPath,
      publicPath,
    }),
    addPlugins([
      new WebpackMd5Hash(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false, drop_console: false } }),
    ]),
  ]),
]);

module.exports = config; // eslint-disable-line
