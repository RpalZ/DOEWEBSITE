const e = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { initCookieObj } = require('../../utils/functions')
const initMongoDB = require('../../database/data')

router.route('/')
    .get((req, res) => {
        res.render(`${__dirname}/../../pages/shop.ejs`)
    })


fs.readdirSync(`${__dirname}/subroutes`).filter(file => file.endsWith('.js'))
    .forEach((file) => {
        const subrouteName = file.slice(0, -3)
        const subrouter = require(`${__dirname}/subroutes/${subrouteName}`)
        router.use(`/${subrouteName}`, subrouter)
    })



module.exports = router