const fs = require('fs')
const path = require('path')

const pagesDir = 'src/pages/'
const pagesPath = path.join(__dirname, '..', pagesDir)

// 动态读取页面目录
const pages = fs.readdirSync(pagesPath).reduce((acc, item) => {
    if(!/\.hbs$/.test(item)) {
        acc.push({
            name: item,
            chunks: ['common', item],
            // output: `${item}.jsp` // 打包输出文件
        })
    }
    return acc
}, [])

module.exports = {
    proxy: false,  // 配置代理
    devPort: 4000, // 开发端口
    distDir: 'public/', // 打包输出目录
    localPublicPath: 'http://localhost:4000/resources/',      // 本地
    remotePublicPath: '//cdn.easypm.cn/pub/', // 远程
    apiRoot: '/api', // api root path
    uploadUrl: '/upload', // apiRoot + uploadUrl
    uploadDir: '../upload/', // 文件保存目录
    pagesDir,
    pages
}
