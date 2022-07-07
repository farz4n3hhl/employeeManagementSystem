const jwt = require('jsonwebtoken');
const { sendResponse } = require('../../utils/response');
const { statusCodes } = require('../../utils/statusCodes');
const { messages } = require('../../utils/messages');
const { dataValidator } = require('../../utils/validatation');
const { submitTimeDataSchema, submitDayDataSchema } = require("./schema");
const { insertListDataInDB, getListDataFromDB} = require('./../../database/database.interface');
const { errorHandler } = require('../../utils/errorHandler');


/* Attendance-and-leave-management service */
const submitLeaveTime = function (req, res) {
    console.log("=======InSubmitLeaveTimeFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                dataValidator(req, res, submitTimeDataSchema);
                insertListDataInDB(decodedToken.username, JSON.stringify(req.data), res, 2);
                sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS);
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
        errorHandler(err, 'SubmitAttendAndLeaveTime');
    }
}

const submitLeaveDays = function (req, res) {
    console.log("=======InSubmitLeaveDaysFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                dataValidator(req, res, submitDayDataSchema);
                insertListDataInDB(decodedToken.username, JSON.stringify(req.data), res, 2);
                sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS);
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
        errorHandler(err, 'submitLeaveDays');
    }

}

const getLeaveTimes = function (req, res) {
    console.log("=======InGetLeaveTimesFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                getListDataFromDB(decodedToken.username, res, 2, 'time');
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
        errorHandler(err, 'getSubmitAndLeaveTimes');
    }
}

const getLeaveDays = function (req, res) {
    console.log("=======InGetLeaveDaysFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                getListDataFromDB(decodedToken.username, res, 2, 'date');
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
        errorHandler(err, 'getSubmitAndLeaveTimes');
    }
}


module.exports = {
    submitLeaveTime,
    submitLeaveDays,
    getLeaveTimes,
    getLeaveDays,
}