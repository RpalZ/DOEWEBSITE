const express = require('express')
const router = express.Router()
const initMongoDB = require('../../../database/data')
const { initCookieObj } = require('../../../utils/functions')

router.route(`/`)
    .get((req, res) => {



        const email = req.body?.femail
        const pass = req.body?.fpassword


        res.render(`${__dirname}/../../../pages/login`, { inputEmail: email })

    })
    .post(async (req, res) => {

        try {

            const { client, collection, db, obj } = new initMongoDB('main')

            const email = req.body?.email
            const pass = req.body?.pass
            console.log(req.body)
            const user = email.split('@')[0]


            const accResult = await collection.findOne(
                { email: email, password: pass }
            )

            if (!accResult) return res.send({ status: 404 })

            req.session.logged = true
            const { password, sessions, ...publicUser } = accResult
            req.session.user = publicUser

            res.send({
                status: 200,
                user: accResult?.user,
                email,
            })

            // console.log({ email, pass })

        } catch (e) {
            console.error(e)
        }
    })


module.exports = router