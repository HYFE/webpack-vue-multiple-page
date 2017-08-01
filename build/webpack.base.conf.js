const path = require('path')
const webpack = require('webpack')
const styleLoaders = require('./styleLoaders')
const projectConf = require('./config')
const resolve = dir => path.join(__dirname, '..', dir)

process.noDeprecation = true

module.exports = {
    entry: projectConf.pages.reduce((acc, item) => {
        const name = item.name
        acc[name] = `./src/pages/${name}/index.js`
        return acc
    }, {
        common: ['vue', 'vue-router', 'axios', './src/common.js'],
    }),
    output: {
        path: resolve('public'),
        publicPath: '/',
        filename: '[name].js'
    },
    resolve: {
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        extensions: ['.js', '.vue'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            fonts: 'assets/fonts',
            images: 'assets/images',
        }
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: [resolve('src')],
            options: {
                formatter: require('eslint-friendly-formatter')
            },
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src')]
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [resolve('src')],
            options: {
                loaders: styleLoaders,
            }
        }, {
            test: /\.css$/,
            use: styleLoaders.css
        }, {
            test: /\.less$/,
            use: styleLoaders.less
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'file-loader',
            include: resolve('src/assets/images/common'),
            options: {
                name: 'images/[name].[ext]'
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'file-loader',
            exclude: resolve('src/assets/images/common'),
            options: {
                name: 'images/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.hbs$/,
            loader: 'handlebars-loader'
        }],
    },
}
