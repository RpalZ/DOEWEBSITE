const express = require('express')
const router = express.Router()
const initMongoDB = require('../../../database/data')


router.route('/')
    .get((req, res) => {
        //render signup html here lmao
        res.render(`${__dirname}/../../../pages/signup`)
    })
    .post(async (req, res) => {
        try {


            const { db, collection, client, obj } = new initMongoDB('main')
            const { username, email, password } = req.body
            const queryResult = await collection.findOne(
                { email }
            )
            if (queryResult) return res.send({ status: 400 })

            const OBJ = { ...obj, email, password, user: username }
            await collection.insertOne(OBJ)

            // await client.close()
            return res.send({ status: 200, user: username })
        } catch (e) {
            console.error(e)
        }
    })


module.exports = router