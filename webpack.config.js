const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var path = require('path');

module.exports = {
    entry:{
        index:'./src/index.js',
        payment:'./src/payment.js',
        finish:'./src/finish.js'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
        ]
    },
    module: {
        rules:[
            {
                test: /\.styl$/,
                exclude: [/node_modules/],
                use: [
                    MiniCssExtractPlugin.loader, 
                    "css-loader",
                    "stylus-loader"
                ],
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            excludeChunks:['payment', 'finish'],
            filename: "./index.html"
        }),
        new HtmlWebPackPlugin({
            template: './src/payment.html',
            chunks: ['payment'],
            filename: 'payment.html'
        }),
        new HtmlWebPackPlugin({
            template: './src/finish.html',
            chunks: ['finish'],
            filename: 'finish.html'
        }),
        new MiniCssExtractPlugin({ 
            filename: '[name].css'
        })
    ]

};