const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/index.html"),
    filename: "./index.html"
});

module.exports = {
    output: {
        publicPath: '/', // if you don't put the "/" here, you get this error:
      },                 // "bundle.js:1 Uncaught SyntaxError: Unexpected token <"
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
}