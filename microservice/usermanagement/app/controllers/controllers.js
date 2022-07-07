const hash = require('password-hash');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('../../utils/response');
const { statusCodes } = require('../../utils/statusCodes');
const { messages } = require('../../utils/messages');
const { dataValidator } = require('../../utils/validatation');
let { connectToDB, DatabaseConnection } = require('../../database/index');
const { signupSchema, loginSchema } = require("./schema");
const { insertDataInDB } = require('./../../database/database.interface');
const { errorHandler } = require('../../utils/errorHandler');
const PRIVATE_KEY = 'cloud'

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

const login = async function (req, res) {
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
            else {
                sendResponse(res, statusCodes.NOT_AUTHORIZED, messages.LOGIN_FAIL);
            }
        });
    
    }
    catch(error) {
        errorHandler(error, 'login');
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


module.exports = {
    signup,
    login,
    logout
}