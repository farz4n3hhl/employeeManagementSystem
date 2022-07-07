const http = require('http')
const { serverOptions } = require('./config')
const { requestHandler } = require('./app')


const server = http.createServer((req, res)=> {
    requestHandler(req, res)
})


server.listen(serverOptions.port, () => {
    console.log(`SalaryManagement service is running...`);
}) 