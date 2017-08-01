const path = require('path')
const fs = require('fs')
const glob = require('glob')
const { SourceMapConsumer } = require('source-map')
const { distDir } = require('./config')
const { argv: { n, l, c } } = require('yargs')

const sourcePath = path.join(__dirname, '..', distDir, 'js')

glob(`${sourcePath}/${n}.*.js.map`, (err, [file]) => {
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'))
    const smc = new SourceMapConsumer(raw)
    // console.log(smc.sources)
    console.log(smc.originalPositionFor({ line: l, column: c }))
})
