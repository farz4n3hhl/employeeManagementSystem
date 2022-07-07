const http = require('http')
const { serverOptions } = require('./config')
const { requestHandler } = require('./app/index')
const request = require('request');


const server = http.createServer((req, res)=> {
    requestHandler(req,res);
})


server.listen(serverOptions.port, () => {
    console.log(`ApiGateWay service is running ...`);
}) 