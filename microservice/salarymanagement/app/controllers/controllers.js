const jwt = require('jsonwebtoken');
const { sendResponse } = require('../../utils/response');
const { statusCodes } = require('../../utils/statusCodes');
const { messages } = require('../../utils/messages');
const  { getDataFromDB } = require('../../database/database.interface');
const { errorHandler } = require('../../utils/errorHandler');


/* salarymanagement service */
const getPayroll = function (req, res) {
    console.log("=======InGetPayrollFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                getDataFromDB(decodedToken.username, res, 3);
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
        errorHandler(err, 'getPayroll');
    }
}


module.exports = {
    getPayroll
}