//manage the server

const fs = require('fs')

//init all server js files
fs.readdirSync(`${__dirname}/src/server`).filter(f => f.endsWith('.js')).forEach((val, i) => {
    require(`${__dirname}/src/server/${val}`)()
})

