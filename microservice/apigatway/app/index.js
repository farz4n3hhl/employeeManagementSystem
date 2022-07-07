const { Router } = require('./router/router')
const { sendResponse } = require('../utils/response')
const { statusCodes } = require('../utils/statusCodes')
const { messages } = require('../utils/messages')
const request = require('request');

exports.requestHandler = function(req, res){
    const route = Router(req, res)
    if(route === null)         
        sendResponse(res, statusCodes.BAD_REQUEST, messages.ROUTE_NOT_FOUND)

    else if(route){
        req.pipe(request(route)).pipe(res);
    }
}