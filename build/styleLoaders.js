const ExtractTextPlugin = require('extract-text-webpack-plugin')

const loaders = (...lang) => {
    const isProd = process.env.NODE_ENV === 'production'
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: isProd,
            sourceMap: isProd
        }
    }

    const loaders = [cssLoader, 'postcss-loader'].concat(lang.map(name => ({
        loader: name + '-loader',
        options: {
            sourceMap: isProd
        }
    })))

    return isProd ? ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
    }) : ['vue-style-loader'].concat(loaders)
}

module.exports = {
    css: loaders(),
    less: loaders('less')
}
