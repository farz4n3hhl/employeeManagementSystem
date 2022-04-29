const http = require('http')
const { serverOptions } = require('./config')
const { requestHandler } = require('./app/index')


const server = http.createServer((req, res)=> {
    requestHandler(req, res)
})


server.listen(serverOptions.port, serverOptions.hostname, () => {
    console.log(`Server running at http://${serverOptions.hostname}:${serverOptions.port}/`);
}) 