const express = require('express')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('404')
    res.status(404)
})

router.get('/:user', (req, res) => {
    const userI = req.params.user.length > 12 ? req.params.user.substring(0, 12) + "..." : req.params.user
    const user = userI[0].toLocaleUpperCase() + userI.slice(1)
    res.render(`${__dirname}/../../../pages/index`,
        {
            user,
            login: 'logged',
            styleSource: `../../Style/index.css`
        })
})

module.exports = router