const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconHashPlugin = require('favicon-hash-webpack-plugin');
const path = require('path');

const WORKING_QUERY_STRING = "id=00054428634ff7360a4429b4a68da3b6&u=cl";

module.exports = () => {
    let buildNum;
    if (process.argv[4]) {
        buildNum = process.argv[4].substring(process.argv[4].indexOf('buildNum=') + 'buildNum='.length);
    }
    return [
        {
            entry: {
                "index": ["./src/scripts/entry.js"]
            },
            output: {
                path: buildNum ? path.resolve(__dirname, "./dist/v" + buildNum) : path.resolve(__dirname, "./dist/"),
                filename: buildNum ? "script.[contenthash].js" : "script.js",
                publicPath: buildNum ? "v" + buildNum + "/" : ""
            },
            devtool: 'source-map',
            devServer: {
                open: true,
                openPage: WORKING_QUERY_STRING ? 'index.html?' + WORKING_QUERY_STRING : 'index.html',
                hot: true
            },
            module: {
                rules: [
                    {
                        test: /\.html$/,
                        exclude: /(node_modules)/,
                        use: [
                            {
                                loader: 'htmllint-loader',
                                query: {
                                    config: 'htmllintrc.json', // path to custom config file, full options list: https://github.com/htmllint/htmllint/wiki/Options
                                    failOnError: true,
                                    failOnWarning: false,
                                },
                            },
                            {loader: 'html-loader'}

                        ]
                    },
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules)/,
                        use: "babel-loader"
                    },
                    {
                        test: /assets[\/|\\].*\.(png|svg|jpe?g|gif|ico)$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: buildNum ? '[name].[contenthash].[ext]' : '[name].[ext]',
                                    outputPath: 'assets/'
                                }
                            }
                        ]
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "postcss-loader",
                            "sass-loader"
                        ]
                    },
                    {
                        test: /fonts[\/|\\].*\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                        use: [
                            {
                                loader: 'file-loader',
                                options: {
                                    name: buildNum ? '[name].[contenthash].[ext]' : '[name].[ext]',
                                    outputPath: 'fonts/'
                                }
                            }
                        ]
                    }
                ]
            },
            plugins: [
                new HtmlWebPackPlugin({
                    template: "src/index.html",
                    filename: buildNum ? "../index.html" : "index.html",
                    favicon: 'src/assets/favicon.ico',
                    inject: 'head',
                }),
                new HtmlWebPackPlugin({
                    template: "src/index.html",
                    filename: buildNum ? "../index.php" : "index.php",
                    favicon: 'src/assets/favicon.ico',
                    inject: 'head',
                }),
                new FaviconHashPlugin({}),
                new OptimizeCssAssetsPlugin({
                    cssProcessorPluginOptions: {
                        preset: ['default', {discardComments: {removeAll: true}}]
                    }
                }),
                new CleanWebpackPlugin()
            ]

        },
    ];
}