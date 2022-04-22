let User = require('../models/User')
const { sendResponse } = require('../../utils/response')
const { statusCodes } = require('../../utils/statusCodes')
const { messages } = require('../../utils/messages')
const { queryObject } = require('../../utils/queryObject')
const { dataValidator } = require('../../utils/validatation')
const getQuerySchema = require('../controllers/schemas/getQuerySchema.json')
let { connectToDB, DatabaseConnection } = require('../../database/index')

const getUserEmployees = function(req, res){
    console.log("=======IngetUserEmployeesFunction");

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
    user.username = queryObj.username
    user.getUserEmployeesFromDB(res)
}

const addAdmin = function(req, res){
    console.log("=======InAddMockAdminFunction");

    var rug = require('random-username-generator');
    var parent = rug.generate();
    console.log('username', parent);

    let db = DatabaseConnection()
    connectToDB(1)
    db.rpush(parent , '', function(err, ok){
        if(err) {
            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
        }
        if (ok){
            connectToDB(0)
            db.hmset(parent, 
                [
                    'username', parent,
                    'parent', parent,
                ]
                , (err, reply) => {
                    if(err) {
                        console.log(err);
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                        return
                    }
                })
            sendResponse(res, statusCodes.SUCCESS, 'Success!', {parent: parent})
        }
    }) 
}


const delAdmin = function(req, res){
    console.log("=======InDeletMockAdminFunction");

    if(!req.data || !req.data.parent){
        sendResponse(res, statusCodes.BAD_REQUEST, messages.BAD_REQUEST)
    }

    let parent = req.data.parent
    let db = DatabaseConnection()
    connectToDB(1)
    db.del(parent, function(err, ok) {
        if (ok == 1) {
           connectToDB(0)
           db.del(parent)
           sendResponse(res, statusCodes.SUCCESS, 'Success!')
        } else{
            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
            return
        }
     })

}

module.exports = {
    getUserEmployees,
}