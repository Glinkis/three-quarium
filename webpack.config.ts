import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";

// tslint:disable:object-literal-sort-keys
export default {
  devtool: "source-map",
  devServer: {
    port: 8080,
    host: "0.0.0.0"
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)$/,
        loader: "ts-loader",
        options: { compilerOptions: { module: "esnext" } },
        include: /src/
      },
      {
        test: /\.s?css$/,
        loaders: [
          "style-loader",
          "css-loader?sourceMap",
          "sass-loader?sourceMap"
        ],
        include: /src/
      }
    ]
  },
  externals: {
    three: "THREE"
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "three-quarium",
      template: "template.html"
    })
  ]
} as Configuration;
