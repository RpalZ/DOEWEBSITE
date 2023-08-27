module.exports = () => {
    const express = require("express")
    const PORT = process.env.PORT || 8000
    const app = express()
    const fs = require('fs')
    const cors = require('cors')
    const path = require("path")
    const bodyParser = require('body-parser');
    const session = require('express-session')
    const cookieParser = require('cookie-parser')
    const MongoStore = require('connect-mongo')
    const { mongoKeyBackUp } = require('../json/config.json')


    const store = MongoStore.create(
        {
            mongoUrl: mongoKeyBackUp,
            dbName: 'sessions'
        }
    )

    app.set('view engine', 'ejs')
    // app.set('trust proxy', 1)

    app.use(cors({ credentials: true }))

    app.get('/', (req, res) => {
        res.redirect('/home')
    })

    const sess = {
        name: 'session_id',
        secret: "cool secret",
        store,
        cookie: {
            maxAge: 1.8e+7,
            sameSite: 'lax'
        },
        saveUninitialized: false,
    }

    // sess.cookie.secure = true


    app.use(express.urlencoded({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(cookieParser())
    app.use(session(sess))
    app.use(function (req, res, next) {
        // console.log(memoryStore)
        res.header('Access-Control-Allow-Origin', 'http://localhost:8000');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    //include static files
    app.use(express.static(`${__dirname}/../website`))

    //init all router functions

    fs.readdirSync(`${__dirname}/../routes`).forEach((dir) => {
        fs.readdirSync(`${__dirname}/../routes/${dir}`).filter(file => file.endsWith(".js")).forEach((file) => {

            const fileRouter = require(`${__dirname}/../routes/${dir}/${file}`)
            const fileName = file.slice(0, -3);
            // console.log(fileRouter, fileName)
            app.use(`/${fileName}`, fileRouter)
        })
    })
    // const homeRouter = require(`${__dirname}/../src/routes/home.js`)

    // app.use('/home', homeRouter)

    app.listen(PORT, () => console.log(`Server is now listening PORT ${PORT}`))
}
