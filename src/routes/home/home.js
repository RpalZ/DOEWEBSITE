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
        if (!cookieObj) return res.render(`${__dirname}/../../pages/index`)
        const { db, collection, client, obj } = new initMongoDB();
        const { session_id } = cookieObj
        if (!session_id) return res.render(`${__dirname}/../../pages/index`)
        const result = await collection.findOne({
            sessions: { $in: [session_id] }
        })
        console.log(result)
        if (result) {
            res.redirect(`/home/user/${result.user}`)
        } else {
            res.render(`${__dirname}/../../pages/index`)
        }


        // await client.close()

        console.table({
            sessionID: req.sessionID, cookie: req.headers.cookie, contains: new RegExp(req.sessionID).test(req.headers.cookie),

        })
        console.log(initCookieObj(req.headers.cookie))
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