var Webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'dist/resources');
var mainPath = path.resolve(__dirname, './src/js', 'index.js');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var stylesPath = path.resolve(__dirname, 'src/styles', 'styles.less');
var autoprefixer = require('autoprefixer');
var Dotenv = require('dotenv-webpack');

var config = function () {

    var extractLess = new MiniCssExtractPlugin({
        filename: 'styles.css',
        disable: false,
    });

    return {
        devtool: 'source-map',
        entry: [mainPath, stylesPath],
        output: {
            path: buildPath,
            filename: 'bundle-prod.js',
        },
        mode: 'production',
        resolve: {
            extensions: ['.js', '.json', '.jsx'],
            alias: {
                react: path.join(__dirname, 'node_modules', 'react'),
            },
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                    }, {
                        loader: 'css-loader',
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [autoprefixer];
                            },
                        },
                    }, {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                nodeModulesPath: '~',
                                coreModulePath: '~',
                            },
                        },
                    }],
                },
                {
                    test: /\.jsx?$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react', '@babel/preset-env'],
                        },
                    }],
                },
                {
                    test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
                    use: [{
                        loader: 'svg-url-loader',
                    }],
                },
            ],
        },
        plugins: [
            extractLess,
            new Webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
            }),
            new Dotenv(),
        ],
    }
};

module.exports = config;
