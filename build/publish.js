process.env.NODE_ENV = 'production'

const webpack = require('webpack')
const conf = require('./webpack.prod.conf')
const projectConf = require('./config')
const clear = require('./clear')

conf.output.publicPath = projectConf.remotePublicPath
conf.devtool = false

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
