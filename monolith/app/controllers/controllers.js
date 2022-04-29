const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../../utils/response');
const { statusCodes } = require('../../utils/statusCodes');
const { messages } = require('../../utils/messages');
const { dataValidator } = require('../../utils/validatation');
let { connectToDB, DatabaseConnection } = require('../../database/index');
const { signupSchema, loginSchema, editUserDataSchema, submitTimeDataSchema, submitDayDataSchema } = require("./schema");
const { insertDataInDB, insertListDataInDB, getDataFromDB, getListDataFromDB, updateUserInfoInDB } = require('./../../database/database.interface');
const { errorHandler } = require('../../utils/errorHandler');
const { decode } = require('jsonwebtoken');
const PRIVATE_KEY = 'EMPAUTH';

/* Auth service */
const signup = async function (req, res) {
    console.log("=======InSignUpFunction\n");
    try {
        dataValidator(req, res, signupSchema);
        
        const personalData = {
            'firstName': req.data.firstName,
            'lastName': req.data.lastName,
            'phoneNumber': req.data.phoneNumber,
            'nationalCode': req.data.nationalCode,
            'email': req.data.email,
            'role': req.data.role
        };
        const hashedPassword = hash.generate(req.data.password);
        const authData = {
            'username': req.data.nationalCode,
            'password': hashedPassword
        };
        const salaryData = {
            'base': '4000.000IRR'
        }
        setTimeout(function() {
            insertDataInDB(req.data.nationalCode, authData, res, 0);
        }, 100);
        setTimeout(function() {
            insertDataInDB(req.data.nationalCode, personalData, res, 1);
        }, 300);
        setTimeout(function() {
            insertDataInDB(req.data.nationalCode, salaryData, res, 3);
        }, 500);
        setTimeout(function() {
            sendResponse(res, statusCodes.SUCCESS, messages.SIGNUP_SUCCESS);
        }, 700);
    }
    catch(error) {
        errorHandler(error, 'signup-function');
    }
}

const login = function (req, res) {
    console.log("=======InLoginFunction\n");
    try {
        dataValidator(req, res, loginSchema);
        if(req.headers.cookie) {
            sendResponse(res, statusCodes.FORBBIDEN, messages.FORBBIDEN);
            return;
        }

        let db = DatabaseConnection()
        connectToDB(0);
        db.hgetall(req.data.username, function(err, credentials) {
            if(err){
                errorHandler(err, 'login: get-credentials-from-db');
                sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND);
                return;
            }
            if(credentials) {
                if(hash.verify(req.data.password, credentials.password)) {
                    const token = jwt.sign({username: credentials.username}, PRIVATE_KEY);
                    res.setHeader('Set-Cookie', `token=${token}; maxAge=10000; HttpOnly; Secur;`);
                    sendResponse(res, statusCodes.SUCCESS, messages.LOGIN_SUCCESS);
                }
                else {
                    sendResponse(res, statusCodes.NOT_AUTHORIZED, messages.LOGIN_FAIL);
                }
            }
        });
    }
    catch(error) {
        errorHandler(error, 'logout');
    }
}

const logout = function (req, res) {
    console.log("=======InLogoutFunction\n");
    try {
        if(req.headers.cookie) {
            res.setHeader('Set-Cookie','token=; Max-Age=0;');
            sendResponse(res, statusCodes.SUCCESS, messages.LOGOUT_SUCCESS);
        }
        else {
            sendResponse(res, statusCodes.FORBBIDEN, messages.FORBBIDEN);
        }
    }
    catch(error) {
        errorHandler(error, 'logout');
    }
}

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
        errorHandler(err, 'GetUserData');
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


/* Attendance-and-leave-management service */
const submitAttendAndLeaveTime = function (req, res) {
    console.log("=======InSubmitAttendAndLeaveTimeFunction");
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

const getSubmitAndLeaveTimes = function (req, res) {
    console.log("=======IngetSubmitAndLeaveTimesFunction");
    try {
        if(req.headers.cookie) {
            const decodedToken = jwt.decode(req.headers.cookie.split('token=')[1]);
            if(decodedToken.username) {
                getListDataFromDB(decodedToken.username, res, 2);
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


/* salary-management service */
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
    signup,
    login,
    logout,
    editUserData,
    getUserData,
    // sendUserData,
    submitAttendAndLeaveTime,
    submitLeaveDays,
    getSubmitAndLeaveTimes,
    getPayroll
}