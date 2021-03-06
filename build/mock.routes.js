const Mock = require('mockjs')
const path = require('path')
const fs = require('fs')
const mockPath = path.resolve(__dirname, '../mock')
const config = require('./config')
const uploadDir = path.join(__dirname, config.uploadDir)

module.exports = app => {
    fs.readdirSync(mockPath).forEach(file => {
        const preUrl = config.apiRoot
        require(path.resolve(mockPath, file))
            .forEach(({url = '/', method = 'get', data }) => {
                app[method](preUrl + url, (req, res) => {
                    const template = typeof data === 'function' ? data(req) : data
                    res.send(Mock.mock(template))
                })
        })
    })

    app.post(config.apiRoot + config.uploadUrl, (req, res) => {
        const form = new multiparty.Form({ uploadDir })

        form.parse(req, (err, fields, files) => {
            const filesTmp = JSON.stringify(files, null, 2)

            if(err){
                console.log('parse error: ' + err)
            } else {
                const { path: uploadedPath, originalFilename } = files.file[0]
                const dstPath = uploadDir + originalFilename

                fs.rename(uploadedPath, dstPath, e => {
                    if(err)  console.log('Upload rename error: ' + e)
                })
            }
            res.send(util.inspect({ fields: fields, files: filesTmp }))
        })
    })
}
