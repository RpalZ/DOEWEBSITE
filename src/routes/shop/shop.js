const e = require('express')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const { initCookieObj } = require('../../utils/functions')
const initMongoDB = require('../../database/data')

router.route('/')
    .get(async (req, res) => {


        try {

            // const mainCollection = new initMongoDB('main')
            const shopCollection = new initMongoDB('shop')
            if (req.session.user) {
                //if there is req.session, check if there is database acc if not then create one 
                const shopResQuery = await shopCollection.collection.findOne({
                    user: req.session.user.user
                })

                if (!shopResQuery) {
                    //create a new shop account
                    const { obj, collection } = shopCollection
                    obj.user = req.session.user.user
                    collection.insertOne(obj)

                }

                res.render(`${__dirname}/../../pages/shop.ejs`, { login: true, user: req.session.user.user })
            } else {
                res.render(`${__dirname}/../../pages/shop.ejs`)
            }
        } catch (e) {
            console.log(e)
        }

    })


fs.readdirSync(`${__dirname}/subroutes`).filter(file => file.endsWith('.js'))
    .forEach((file) => {
        const subrouteName = file.slice(0, -3)
        const subrouter = require(`${__dirname}/subroutes/${subrouteName}`)
        router.use(`/${subrouteName}`, subrouter)
    })



module.exports = router