import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as MiniCssExtractPlugin from "mini-css-extract-plugin";
import { Configuration } from "webpack";

// tslint:disable:object-literal-sort-keys
export default {
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { compilerOptions: { module: "esnext" } },
        include: /src/
      },
      {
        test: /\.scss$/,
        loaders: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: "three-quarium",
      template: "template.html",
      hash: true
    })
  ]
} as Configuration;
