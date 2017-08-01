process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const conf = require('./webpack.prod.conf')
const clear = require('./clear')

conf.plugins.push(new BundleAnalyzerPlugin())

webpack(conf, (err, stats) => {
    clear.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})
