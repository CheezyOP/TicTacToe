const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PurgeCssPlugin = require('purgecss-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV;

module.exports = {
    mode: env == 'production' || env == 'none' ? env : 'development',
    entry: {
        app: [path.resolve(__dirname + '/Logic.js'), path.resolve(__dirname + '/Styling.css')]
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name]-[contenthash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: 'assets/images/[name]-[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css'
        }),

        new HtmlPlugin({
            filename: 'UI.html',
            template: 'UI.html',
        }),

        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
    ]
};

if (env === 'production') {
    module.exports.plugins.push(
        new OptimizeCssAssetsPlugin({
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }]
            }
        })
    );

    module.exports.plugins.push(
        new PurgeCssPlugin({
            paths: glob.sync(path.join(__dirname, 'src') + '/**/*', { nodir: true })
        })
    );
}