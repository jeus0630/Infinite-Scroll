const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const pages = require('./webpack/webpack.page');

module.exports = {
    mode:'development',
    devtool: "source-map",
    entry:{
        css: ['./src/scss/style.scss'],
        index: ['./src/js/pages/index.js'],
    },
    output:{
        filename:'assets/js/[name].bundle.js',
        path:path.resolve(__dirname, 'dist/'),
        sourceMapFilename: '[file].map'
    },
    module: {
        rules:[
            {
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-compiled-loader',
                        options: {
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        sourceMap: true,
                        presets:[
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    shippedProposals: true,
                                    corejs: 3,
                                    targets: {
                                        browsers: ['last 2 versions', 'ie >= 11']
                                    }
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/css/[name].css"
                        }
                    },
                    {
                        loader: "extract-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            url : false,
                            sourceMap: true,
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap:true
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    output: {
                        comments: false,
                    },
                },
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                }
            })
        ],
    },
    // devServer: {
    //     host : '0.0.0.0',
    //     disableHostCheck: true,
    //     publicPath: '/',
    //     contentBase: path.join(__dirname, 'dist'),
    //     compress: false,
    //     watchContentBase: true, // Must be true
    //     port: 8000,
    //     hot: true,
    //     inline: true,
    //     open: true,
    // },
    devServer: {
        host : '0.0.0.0',
        static: {
            publicPath: '/',
            directory: path.join(__dirname, 'dist'),
            watch: true,
        },
        hot: true,
        compress: true,
        port: 9999,
        open : true 
      },
    plugins:pages
};
