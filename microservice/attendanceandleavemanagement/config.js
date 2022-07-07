
//server config
const serverOptions = {
    hostname: '127.0.0.1',
    port: 80
} 

// redis config
const redisOptions = {
    host: 'redis',
    port: 6379,
    maxRetriesPerRequest: 4,  // only retry failed requests 4 times
    enableOfflineQueue: true, // queue offline requests
    retryStrategy: function(times) {
      return 2000 // reconnect after 2 seconds
    },
}


module.exports = {
    serverOptions,
    redisOptions,
}
