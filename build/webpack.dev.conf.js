const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
const projectConf = require('./config')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(name => {
    baseConfig.entry[name] = ['./build/devClient'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ]
})
