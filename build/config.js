module.exports = {
    proxy: false,  // 配置代理
    devPort: 4000, // 开发端口
    distDir: 'public/', // 打包输出目录
    localPublicPath: 'http://localhost:4000/resources/',      // 本地
    remotePublicPath: '//cdn.easypm.cn/pub/', // 远程
    apiRoot: '/api', // api root path
    uploadUrl: '/upload', // apiRoot + uploadUrl
    uploadDir: '../upload/', // 文件保存目录
    pages: [{ // src/pages 目录下多页面配置
        title: '测试', // 页面标题
        name: 'one', // 页面名称与 js 名称一致
        chunks: ['common', 'one']
        // output: 'one.jsp'  // 打包输出文件
    }]
}
