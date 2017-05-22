const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const build = {
    path: path.join(__dirname, 'build/js')
}

module.exports = {
    context: path.join(__dirname, 'src'),
    devtool: false,
    entry: './app/main.jsx',

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['react', 'es2015'],
                        plugins: ['react-html-attrs'],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract('css-loader'),
            },
            {
                test: /\.(eot|ttf|woff2|woff|svg)$/,
                use: 'file-loader?name=../fonts/[name].[ext]',
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(['css-loader', 'less-loader']),
            },
        ]
    },


    output: {
        path: build.path,
        filename: 'main.min.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CleanWebpackPlugin(['build'], {
            verbose: true,
            dry: false,
        }),
        new CopyWebpackPlugin([
            { from: 'index.html', to: '../index.html' },
        ]),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
        new ExtractTextPlugin('../css/style.css'),
    ],
};