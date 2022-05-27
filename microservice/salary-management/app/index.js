const parser = require('url')
const { Router } = require('./router/router')
const { sendResponse } = require('../utils/response')
const { statusCodes } = require('../utils/statusCodes')
const { messages } = require('../utils/messages')


exports.requestHandler = function(req, res){
    const url = parser.parse(req.url)
    
    const route = Router(req, res)
    if(route === null)         
        sendResponse(res, statusCodes.BAD_REQUEST, messages.ROUTE_NOT_FOUND)

    else{
        if(route.queryNeeded === true) {
            req.query = url.query
            route.function(req, res) //function call
        }
        else if(route.dataNeeded === true){
            if(url.query){
                sendResponse(res, statusCodes.BAD_REQUEST, messages.BAD_REQUEST)
                return
            }
            let data = ''
            req.on('data', (chunk) => {
                try{
                    data += chunk.toString()
                }catch(e){
                    console.log('\nError in fetching request data: \n', e);
                    sendResponse(res, statusCodes.BAD_REQUEST, messages.REQ_DATA_ERROR)
                }
            })
    
            req.on('end', () => {
                try{
                    data = JSON.parse(data)
                    req.data = data
                    route.function(req, res) //function call
    
                }catch(e){
                    console.log('\nError in fetching request data: \n', e);
                    sendResponse(res, statusCodes.BAD_REQUEST, messages.REQ_DATA_ERROR)
                }
            })
        }
        else{
            route.function(req, res) //function call
        }
    }
}