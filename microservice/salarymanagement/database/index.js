const { redisOptions } = require('../config')
const redis = require('redis')
let dataBase = redis.createClient(redisOptions)

const connectToDB = function(index) {
    dataBase.on('error', (error)=> {
        console.log(`Redis connection failed, <error> : ${error}`)
    })

    dataBase.select(index)
    return dataBase
}

const DatabaseConnection = function() {
    return dataBase
}

const dbSize = function() {
    return dataBase.dbsize();
}
module.exports = {
    connectToDB,
    DatabaseConnection,
    dbSize,
}