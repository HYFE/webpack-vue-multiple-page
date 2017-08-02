const express = require('express')
const reload = require('reload')
const opn = require('opn')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const projectConf = require('./config')
const proxyMiddleware = require('http-proxy-middleware')
const devMiddleware = require('./devMiddleware')

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

const app = express()
const isDevMode = process.env.NODE_ENV === 'development'

if (projectConf.proxy) {
    var proxyOption = {
        target: projectConf.proxy,
        changeOrigin: true,
        logLevel: 'debug',
        onProxyRes(proxyRes, req, res) {
            var _location = proxyRes.headers['location'];
            if (_location) {
                console.log("_location:" + _location)
                proxyRes.headers['location'] = _location.replace(projectConf.proxy+'/', '/')
            }
        },
    }
    const pathRegexp = /^\/.*\.(js|json)$|^\/images\/.*$|^\/src\/.*$|^\/__webpack_hmr$|^\/reload\/reload.js$/;
    var filter = function (pathname, req) {
        var ret = pathRegexp.test(pathname)
        if (ret) {
            console.log("   local get: " + pathname)
        }
        return !ret
    }

    var proxy = proxyMiddleware(filter, proxyOption)
    app.use(proxy)
} else {
    app.set('views', path.join(__dirname, '..', projectConf.pagesDir))
    app.set('view engine', 'hbs')

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/', require('./devRouter'))
    // mock router
    require('./mock.routes')(app)
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

if (isDevMode) {
    devMiddleware(app)
    // serve pure static assets
    app.use('/src', express.static('./src'))
} else {
    app.use(express.static('./public'))
    app.use('/src', express.static('./src'))
}

const server = http.createServer(app)

if (isDevMode) reload(app)

module.exports = server.listen(projectConf.devPort, err => {
    // Fix node V8.0, https://github.com/glenjamin/webpack-hot-middleware/issues/210
    server.keepAliveTimeout = 0
    if (err) {
        console.log(err)
        return
    }
    const uri = 'http://localhost:' + projectConf.devPort
    console.log(`Listening at ${uri}\n`)
    opn(uri)
})
