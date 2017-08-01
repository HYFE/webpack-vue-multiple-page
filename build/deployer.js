require('shelljs/global')
const path = require('path')
const config = require('./config')
/**
 * 复制前端打包文件到 java 对应目录
 */

// 目标路径
const prjPath = path.join(__dirname, '..')
const sourceDir = path.join(prjPath, '../resources/static/resources')
const pagePath = path.join(prjPath, '../webapp/WEB-INF/views/pages/platform/platform_pc.jsp')

// 原始路径
const distDir = path.join(prjPath, config.distDir)

cp('-R', distDir + '/!page', sourceDir)
