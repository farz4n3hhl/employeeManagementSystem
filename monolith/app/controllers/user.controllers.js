let User = require('../models/User')
const { sendResponse } = require('../../utils/response')
const { statusCodes } = require('../../utils/statusCodes')
const { messages } = require('../../utils/messages')
const { queryObject } = require('../../utils/queryObject')
const { dataValidator } = require('../../utils/validatation')
const getQuerySchema = require('../controllers/schemas/getQuerySchema.json')
const deleteDataSchema = require('../controllers/schemas/deleteDataSchema.json')

const sendUserData = function(req, res) {
    console.log("=======InsendUserDataFunction");
    let data = req.data
    let user = new User(data, 'post')
    if(user.userValidation() === false) {
        sendResponse(res, statusCodes.BAD_REQUEST, user.validationResult.errors)
        return
    }else{
        //store user data in db0/dataStorage
        user.addUserToDB(res)
    }
}

const getUserData = function(req, res) {
    console.log("=======InGetUserDataFunction");
    
    try{
        if(req.query === null){
            sendResponse(res, statusCodes.BAD_REQUEST, messages.QUERY_NEEDED)
            return
        }
    
        //convert query to object and validates it
        let queryObj = queryObject(req.query)
        let queryValidationResult = dataValidator(getQuerySchema, queryObj)
        if(queryValidationResult.errors.length > 0) {
            sendResponse(res, statusCodes.BAD_REQUEST, queryValidationResult.errors)
            return
        }
    
        //make a user model and fetch data from db
        let user = new User()
        user.getUserInfoFromDB(queryObj.username, res)
    }
    catch(e) {
        sendResponse(res, statusCodes.BAD_REQUEST, e)
    }
    
}

const updateUserData = function(req, res) {
    console.log("=======InupdateUserDataFunction");
    
    let data = req.data
    let user = new User(data, 'update')

    if(user.userValidation() === false) {
        console.log(user.validationResult.errors);
        sendResponse(res, statusCodes.BAD_REQUEST, user.validationResult.errors)
        return
    }else{
        //store user data in db0/dataStorage
        user.updateUserInfoInDB(res)
    }
}

const deleteUserData = function(req, res){
    console.log("=======InDeleteUserDataFunction");
    let data = req.data
    let dataValidationResult = dataValidator(deleteDataSchema, req.data)
    if(dataValidationResult.errors.length > 0) {
        sendResponse(res, statusCodes.BAD_REQUEST, dataValidationResult.errors)
        return
    }
    let user = new User()
    user.username = data.username
    user.parent = data.parent
    user.deleteUserInfoInDB(res)
    
}

module.exports = {
    sendUserData,
    getUserData,
    updateUserData,
    deleteUserData,
}