const e = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { initCookieObj } = require('../../utils/functions')
const initMongoDB = require('../../database/data')

router.get('/', async (req, res) => {

    try {


        const cookieObj = initCookieObj(req.headers.cookie)
        console.log(req.cookies)
        if (!req.session) return res.render(`${__dirname}/../../pages/index`)
        if (!req.session.user) return res.render(`${__dirname}/../../pages/index`)
        const user = req.session.user
        res.redirect(`/home/user/${user.user}`)
    } catch (e) {
        console.log(e)
    }
    // console.log(req.session.id)
})

//init all subroutes 

fs.readdirSync(`${__dirname}/subroutes`).filter(file => file.endsWith('.js'))
    .forEach((file) => {
        const subrouteName = file.slice(0, -3)
        const subrouter = require(`${__dirname}/subroutes/${subrouteName}`)
        router.use(`/${subrouteName}`, subrouter)
    })




module.exports = router