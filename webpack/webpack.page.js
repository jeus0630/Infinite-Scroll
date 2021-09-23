const path = require('path');
const fs = require('fs');
const ejsDir = path.resolve(__dirname,'../src/ejs');
const ejsEntries = fs.readdirSync(ejsDir);

const HtmlWebPackPlugin = require('html-webpack-plugin');
const folderPath = path.resolve(__dirname, "./src/");
const LiveReloadPlugin = require('webpack-livereload-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

const pages = [
    new LiveReloadPlugin({
        appendScriptTag: true
    }),
    new HtmlWebpackTagsPlugin({
        hash: true,
        append: false,
        tags: [
            './assets/css/style.css',
            '/static/vendor/modernizr-detectizr.js',
            '/static/vendor/ejs.min.js'
        ]
    }),

    new HtmlWebPackPlugin({
        title : 'Spacestagqram',
        description: 'Spacestagram - New Platform for Space pictures',
        url: '',
        keyword: '',
        hash: true,
        template: './src/ejs/index.ejs',
        chunks: ['index','style'],
        filename:'index.html',
        HTML_PATH: folderPath
    }),


];

module.exports = pages;

