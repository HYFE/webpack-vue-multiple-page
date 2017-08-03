const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')
const baseConfig = require('./webpack.base.conf')
const projectConf = require('./config')
const distDir = path.resolve(__dirname, '../' + projectConf.distDir)

const minify = {
    removeComments: true,
    collapseWhitespace: true,
    removeScriptTypeAttributes: true
}

const chunksSort = orders => (chunk1, chunk2) => {
    // https://github.com/jantimon/html-webpack-plugin/issues/481
    const o1 = orders.indexOf(chunk1.names[0])
    const o2 = orders.indexOf(chunk2.names[0])
    return o1 - o2
}

module.exports = merge(baseConfig, {
    devtool: '#source-map',
    output: {
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[chunkhash].js',
        path: distDir,
        publicPath: projectConf.localPublicPath
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].[chunkhash].css',
            allChunks: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new LodashWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
    ].concat(projectConf.pages.map(item => new HtmlWebpackPlugin({
        filename: `pages/${item.output || `${item.name}.html`}`,
        template: `${projectConf.pagesDir + item.name}/index.hbs`,
        inject: true,
        minify,
        chunks: item.chunks,
        chunksSortMode: chunksSort(item.chunks),
        isProd: true
    })))
})
