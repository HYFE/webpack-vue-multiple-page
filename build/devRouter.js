const router = require('express').Router()
const config = require('./config')

const pages = config.pages

router.get('/', (req, res, next) => {
    res.render('index', { pages })
})

pages.forEach(({ name, title, chunks }) => {
    router.get('/' + name, (req, res, next) => {
        res.render(name + '/index', {
            chunks: chunks,
            devMode: true,
        })
    })
})

module.exports = router
