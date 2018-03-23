import { Configuration, HotModuleReplacementPlugin } from "webpack";
import * as path from "path";
import * as HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  devtool: "source-map",
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    hot: true
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
          "css-loader?sourceMaps",
          "sass-loader?sourceMaps"
        ],
        include: /stylesheets/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "three-quarium",
      template: "template.html"
    })
  ]
} as Configuration;
