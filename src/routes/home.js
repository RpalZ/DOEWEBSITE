const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render(`${__dirname}/../pages/index`)
})

router.get('/login', (req, res) => {
    const email = res.body?.femail
    res.render(`${__dirname}/../pages/login`, { inputEmail: email })
})

router.get(`/user/:user`, (req, res) => {
    const userI = req.params.user.length > 12 ? req.params.user.substring(0, 12) + "..." : req.params.user
    const user = userI[0].toLocaleUpperCase() + userI.slice(1)
    res.render(`${__dirname}/../pages/index`,
        {
            user,
            login: 'logged',
            styleSource: `../../Style/index.css`
        })
})


router.post('/login/auth', (req, res) => {
    const userEmail = req.body.femail
    const user = userEmail.split('@')[0]
    const userPass = req.body.fpassword
    res.redirect(`/home/user/${user}`)

    console.log({ userEmail, userPass })

})
module.exports = router