const jwt = require('jsonwebtoken');
// const grpc = require('@grpc/grpc-js');
const { sendResponse } = require('../../utils/response');
const { statusCodes } = require('../../utils/statusCodes');
const { messages } = require('../../utils/messages');
const { dataValidator } = require('../../utils/validatation');
const { editUserDataSchema } = require("./schema");
const { getDataFromDB, updateUserInfoInDB } = require('./../../database/database.interface');
const { errorHandler } = require('../../utils/errorHandler');


/* Data-management service */
const editUserData = function(req, res) {
    console.log("=======InEditUserDataFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            dataValidator(req, res, editUserDataSchema);
            const {phoneNumber, email, role} = req.data;
            if(decodedToken.username && (phoneNumber || email || role)) {
                updateUserInfoInDB(decodedToken.username, req.data, res, 1);
                sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS);
            }
            else {
                sendResponse(res, statusCodes.BAD_REQUEST, messages.BAD_REQUEST);
            }
        }
        else {
            sendResponse(res, statusCodes.FORBBIDEN, messages.FORBBIDEN);
        }
    }
    catch(error) {
        errorHandler(err, 'editUserData');
    }
}

const getUserData = function(req, res) {
    console.log("=======InGetUserDataFunction");
    try {
        if(req.headers.cookie) {
            // grpc.RequesterBuilder()
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                getDataFromDB(decodedToken.username, res, 1);
            }
            else {
                sendResponse(res, statusCodes.FORBBIDEN, messages.FORBBIDEN);
            }
        }
        else {
            sendResponse(res, statusCodes.FORBBIDEN, messages.FORBBIDEN);
        }
    }
    catch(error) {
        errorHandler(error, 'GetUserData');
    }
}
//-----
// const sendUserData = function(req, res) {
//     console.log("=======InsendUserDataFunction");
//     let data = req.data
//     let user = new User(data, 'post')
//     if(user.userValidation() === false) {
//         sendResponse(res, statusCodes.BAD_REQUEST, user.validationResult.errors)
//         return
//     }else{
//         //store user data in db0/dataStorage
//         user.addUserToDB(res)
//     }
// }



module.exports = {
    editUserData,
    getUserData,
    // sendUserData
}