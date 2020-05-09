const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Terser = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = (env, argv) => {
  const IS_PROD = argv.mode === "production";
  const config = {
    watch: true,
    mode: "development",
    entry: {
      _example: "./src/_example.tsx"
    },
    output: {
      publicPath: "/",
      path: path.join(__dirname, "public"),
      filename: "[name].min.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader"
        }
      ]
    },
    devtool: "cheap-module-eval-source-map",
    devServer: {
      open: false,
      overlay: true,
      port: 1234,
      host: "0.0.0.0",
      contentBase: "public",
      historyApiFallback: true
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "src/_example.html"
      })
    ]
  };

  if (IS_PROD) {
    config.watch = false;
    config.mode = "production";
    config.devtool = "none";
    config.optimization = {
      minimizer: [
        new Terser({
          terserOptions: {
            output: {
              comments: false
            }
          }
        })
      ]
    };
    config.plugins.push(
      new CompressionPlugin({
        test: /\.js(\?.*)?$/i
      })
    );
    // config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
