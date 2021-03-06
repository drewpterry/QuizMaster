const {resolve} = require('path');
const webpack = require('webpack');
const {getIfUtils, removeEmpty} = require('webpack-config-utils');

module.exports = env => {
  const {ifProd, ifNotProd} = getIfUtils(env)

  return {
    entry: './index.js',
    context: __dirname,
    output: {
      path: resolve(__dirname, './build'),
      filename: 'bundle.js',
      publicPath: '/build/',
      pathinfo: ifNotProd(),
    },
    devtool: ifProd('source-map', 'eval'),
    devServer: {
      port: 8020,
      historyApiFallback: true,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false
        } 
      }
    },
    module: {
      loaders: [
        {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /(\.eot|\.woff2|\.woff|\.ttf|\.svg)/, loader: 'file-loader'},
      ],
    },
    resolve: {
        modules: ['app', 'node_modules']
    },
    plugins: removeEmpty([
      ifProd(new webpack.optimize.DedupePlugin()),
      ifProd(new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
        quiet: true,
      })),
      ifProd(new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"',
        },
      })),
      ifProd(new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true, // eslint-disable-line
          warnings: false,
        },
      })),
    ])
  }
};
