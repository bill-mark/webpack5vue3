const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const ip = require("ip");
const path = require("path");

let port = "8082";

module.exports = (env) => {
  let dev_config = {
    devtool: "inline-source-map", //开启source map
    mode: "development",
    cache: {
      type: "filesystem",
    },
    module: {
      rules: [
        {
          //解析器的执行顺序是从下往上(先css-loader再style-loader)
          test: /\.css$/i,
          use: [
            "style-loader",
            "css-loader"
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // 将 JS 字符串生成为 style 节点
            "style-loader",
            // 将 CSS 转化成 CommonJS 模块
            "css-loader",
            // 将 Sass 编译成 CSS
            "sass-loader",
          ],
        },
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            "style-loader",
            "css-loader",
            "less-loader",
          ],
        },
      ],
    },
    plugins: [
      //运行成功，输出信息
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `You application is running here http://${ip.address()}:${port} \r\nYou can also open local address http://localhost:${port}`,
          ],
          clearConsole: true,
        },
      }),
    ],
    devServer: {
      host: "0.0.0.0",
      port: port,
      //open:"http://localhost:" + port,//打开指定窗口
      proxy: {
        "/api": {
          target: "http://www.xxx.com:8080/api",
          secure: true, // 如果是https接口，需要配置这个参数
          changeOrigin: true,
          pathRewrite: { "^/finchinaAPP": "" },
        },
      },
    },
  };

  return merge(common(env), dev_config);
};
