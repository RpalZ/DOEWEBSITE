const express = require('express')
const router = express.Router()
const initMongoDB = require('../../../database/data')
const { initCookieObj } = require('../../../utils/functions')


router.get('/', (req, res) => {
    res.redirect('/home')
})

router.get('/:user', async (req, res) => {

    try {


        const userI = req.params.user.length > 12 ? req.params.user.substring(0, 12) + "..." : req.params.user
        const user = userI[0].toLocaleUpperCase() + userI.slice(1)

        if (!req.session || !req.session.user) return res.redirect('/home')
        const userName = req.session.user.user
        if (userName !== req.params.user) return res.redirect(`/home/user/${userName}`)
        // console.log(req.sessionID)
        res.render(`${__dirname}/../../../pages/index`,
            {
                user,
                login: 'logged',
                styleSource: `../../Style/index.css`
            })
    } catch (e) {
        console.error(e)
    }
})

module.exports = router