var path = require('path');
var mainPath = path.resolve(__dirname, './src/js', 'index.js');
var stylesPath = path.resolve(__dirname, 'src/styles', 'styles.less');
var autoprefixer = require('autoprefixer');
var Dotenv = require('dotenv-webpack');

module.exports = {
    entry: ['babel-polyfill', mainPath, stylesPath],
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'http://localhost:3050/assets/',
        filename: 'bundle.js',
    },
    mode: 'development',
    resolve: {
        alias: {
            react: path.join(__dirname, 'node_modules', 'react'),
        },
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: function() {
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
    devServer: {
        stats: 'errors-only',
        disableHostCheck: true,
    },
    plugins: [
        new Dotenv(),
    ],
};
