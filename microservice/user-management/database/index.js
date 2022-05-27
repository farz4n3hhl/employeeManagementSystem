const redis = require('redis')

// redis config
const redisOptions = {
    host: '127.0.0.1',
    port: 6379,
    maxRetriesPerRequest: 4,  // only retry failed requests 4 times
    enableOfflineQueue: true, // queue offline requests
    retryStrategy: function(times) {
      return 2000 // reconnect after 2 seconds
    },
}

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