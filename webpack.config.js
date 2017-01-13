const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const yargs = require('yargs');
// noinspection JSUnresolvedVariable
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
// noinspection JSUnresolvedVariable
const env = yargs.argv.mode;
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
  plugins.push(new UglifyJsPlugin({ minimize: true }));
} else {
  devtool = 'source-map';
}

module.exports = {
  entry: `${__dirname}/src`,
  output: {
    path: `${__dirname}/build`,
    filename: `[name]${appendix}`,
  },
  devtool,
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: /src/ },
      { test: /\.scss$/, loaders: ['style', 'css?sourceMaps', 'sass?sourceMaps'], include: /stylesheets/ },
    ],
  },
  plugins,
};
