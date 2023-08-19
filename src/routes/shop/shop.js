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


module.exports = router