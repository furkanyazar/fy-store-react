const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");

module.exports = () => {
  const env = dotenv.config().parsed;

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: {
      vendor: {
        import: path.resolve(__dirname, "./src/vendor.ts"),
      },
      index: {
        dependOn: "vendor",
        import: path.resolve(__dirname, "./src/index.tsx"),
      },
    },
    output: {
      publicPath: "/",
      path: path.resolve(__dirname, "./dist"),
      filename: "[name].[contenthash].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
          type: "asset",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/index.html"),
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
      new CopyPlugin({
        patterns: [
          { from: "./src/assets/img", to: "assets/img" },
          { from: "public", to: path.join(__dirname, "./dist") },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
    ],
  };
};
