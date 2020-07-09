const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const CompressionPlugin = require("compression-webpack-plugin")
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin")
const Dotenv = require("dotenv-webpack")

const isDev = process.env.NODE_ENV !== "production"

module.exports = {
  mode: isDev ? "development" : "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "[name].[contenthash].js",
  },
  resolve: { extensions: [".mjs", ".js", ".ts", ".tsx"] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: { transpileOnly: true },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.ttf$/, use: ["file-loader"] },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, isDev ? ".env" : ".env.production"),
    }),
    new CopyWebpackPlugin({ patterns: [{ from: "public" }] }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
    new CompressionPlugin({ test: /\.js$/ }),
    new MonacoWebpackPlugin(),
  ],
  devServer: {
    // index: "index.html",
    historyApiFallback: {
      // index: "index.html",
      // disableDotRule: true,
      rewrites: [{ from: /./, to: "/index.html" }],
    },
    open: true,
    inline: true,
  },
}
