module.exports = () => {
    const express = require("express")
    const PORT = process.env.PORT || 8000
    const app = express()
    const fs = require('fs')
    const cors = require('cors')
    const path = require("path")

    app.set('view engine', 'ejs')

    app.use(cors())

    app.get('/', (req, res) => {
        res.redirect('/home')
    })


    app.use(express.urlencoded({ extended: true }))
    //include static files
    app.use(express.static(`${__dirname}/../src/website`))

    //init all router functions

    fs.readdirSync(`${__dirname}/../src/routes`).filter(file => file.endsWith(".js")).forEach((file) => {
        const fileRouter = require(`${__dirname}/../src/routes/${file}`)
        const fileName = file.slice(0, -3);
        app.use(`/${fileName}`, fileRouter)
    })
    // const homeRouter = require(`${__dirname}/../src/routes/home.js`)

    // app.use('/home', homeRouter)

    app.listen(PORT, () => console.log(`Server is now listening PORT ${PORT}`))
}
