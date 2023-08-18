// (async () => {
//     const { MongoClient } = require('mongodb')

//     const uri = 'mongodb+srv://rayaprayuda123:Assasinkiller603@cluster0.in767t4.mongodb.net/?retryWrites=true&w=majority'

//     const client = new MongoClient(uri)

//     await client.connect()

//     const dbName = "DoeWebsite"
//     const collectionName = "Accounts"

//     const db = client.db(dbName)
//     const collection = db.collection(collectionName)

//     const testObj = {
//         name: "John",
//         password: "iloveJohn"
//     }

//     try {

//         const doc = await collection.findOne({
//             name: "John"
//         })
//         const update = await collection.findOneAndUpdate({
//             name: 'John'
//         }, { $set: { password: "lol" } })
//         console.log('success!')

//     } catch (e) {
//         console.log(e)
//     }
// })



const { mongoKey, mongoKeyBackUp } = require('../json/config.json')
const _ = require('lodash')

// 3 different collections: accMain, accSnakeGame, accEcommerce, accToDoList

const accMain = {
    user: '',
    email: '',
    password: ''
}

const accSnakeGame = {
    user: '',
    highscore: 0,
}

const accEcommerce = {
    user: '',
    itemsInCart: [],
    itemsPurchased: []

}

const toDoList = {
    user: '',
    itemsToDo: [],
}

class initMongoDB {
    constructor(type = 'main') {
        let delObj;
        let collectionName;
        switch (type) {
            case 'main': {
                delObj = accMain
                collectionName = 'Accounts'
            }
                break;
            case 'snake': {
                delObj = accSnakeGame
                collectionName = "snakeAccs"
            }
                break;
            case 'ecommerce': {
                delObj = accEcommerce
                collectionName = "ecomAccs"
            }
                break;
            case 'todo': {
                delObj = toDoList
                collectionName = "todoAccs"
            }
            default: {
                throw new Error('Please specify type: {main, snake, ecommerce, todo}')
            }
        }

        try {


            const finObj = _.cloneDeep(delObj)
            const { MongoClient } = require('mongodb'),
                client = new MongoClient(mongoKeyBackUp)
            client.connect()

            const db = client.db('DoeWebsite')
            const collection = db.collection(collectionName)

            this.db = db
            this.client = client
            this.collection = collection
            this.obj = finObj
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = initMongoDB


