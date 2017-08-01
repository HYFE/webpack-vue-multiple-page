const webpack = require('webpack')
const config = require('./webpack.dev.conf')

module.exports = app => {
    const compiler = webpack(config)
    const devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true,
        stats: {
            colors: true,
            chunks: false
        }
    })
    const hotMiddleware = require('webpack-hot-middleware')(compiler)

    // force page reload when html-webpack-plugin template changes
    compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
            hotMiddleware.publish({ action: 'reload' })
            cb()
        })
    })

    app.use(devMiddleware)
    app.use(hotMiddleware)
}
