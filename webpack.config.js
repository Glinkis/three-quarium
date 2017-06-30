const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const env = require('yargs').argv.mode;
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const plugins = [
  new HtmlWebpackPlugin({
    title: 'three-quarium',
    template: `${__dirname}/template.html`,
  }),
  new CleanWebpackPlugin(['build'], {
    root: __dirname,
  }),
];

let appendix = '.js';
let devtool = '';

if (env === 'build') {
  appendix = '.min.js';
  plugins.push(new UglifyJsPlugin({ minimize: true, sourceMaps: true }));
} else {
  devtool = 'source-map';
}

module.exports = {
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: `[name]${appendix}`,
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  devtool,
  module: {
    loaders: [
      { test: /\.(ts|js)$/, loader: 'awesome-typescript-loader', include: /src/ },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMaps', 'sass?sourceMaps'], include: /stylesheets/ },
    ],
  },
  plugins,
};
