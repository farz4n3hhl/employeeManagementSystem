let { connectToDB, DatabaseConnection } = require('../database/index');
const { sendResponse } = require('../utils/response');
const { statusCodes } = require('../utils/statusCodes');
const { messages } = require('../utils/messages');
const { errorHandler } = require('../utils/errorHandler');


exports.insertDataInDB = function (key, data, res, dbIndex) {
    let db = DatabaseConnection();
    let user = data;
    
    //check if username is in db
    connectToDB(dbIndex);
    db.exists(key, function(err, reply) {
        if (err) {
            errorHandler(err, 'insert-in-db');
            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
            return;
         }
        if (reply === 1) {
            sendResponse(res, statusCodes.DUPLICATE_ID, messages.DUPLICATE_ID)
            return;
        }
        else{
            let dataForDB = [];
            for (const [k, v] of Object.entries(user)){
                dataForDB.push(k);
                dataForDB.push(v);
            }
            db.hmset(key, dataForDB, (err, reply) => {
                if(err) {
                    errorHandler(err, 'insert-in-db');
                    sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                }
            });
        }
    });
}

exports.insertListDataInDB = function (key, data, res, dbIndex) {
    let db = DatabaseConnection();
    let user = data;
    
    //check if username is in db
    connectToDB(dbIndex);
    db.exists(key, function(err, reply) {
        if (err) {
            errorHandler(err, 'insert-in-db');
            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
            return;
         }
        if (reply === 1) {
            sendResponse(res, statusCodes.DUPLICATE_ID, messages.DUPLICATE_ID)
            return;
        }
        else{
            db.rpush(key, user, function(err, ok){
                if(err){
                    errorHandler(err, 'push list in db');
                    sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                }
                if (ok){
                    sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS);
                }
            })
        }
    });
}

exports.getDataFromDB = function (key, res, dbIndex) {
    let db = DatabaseConnection();
    connectToDB(dbIndex);
    db.exists(key, function(err, reply) {
        if(err){
            errorHandler(err, 'get-from-db');
            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
            return;
        } 
        if(reply===1) {
             db.hgetall(key, function(err, data) {
                if(err){
                    errorHandler(err, 'get-from-db');
                    sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND);
                    return;
                }
                if(data) {
                    sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS, data);
                    return;
                }
            });
        }
        else{
            errorHandler('Data Not Found!')
            sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND);
            return;
        }
    });
}

exports.getListDataFromDB = function (key, res, dbIndex) {
    let db = DatabaseConnection();
    connectToDB(dbIndex);
    db.exists(key, function(err, reply) {
        if(err){
            errorHandler(err, 'get-from-db');
            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
            return;
        } 
        if(reply===1) {
             db.lrange(key, 0, -1, function(err, data) {
                if(err){
                    errorHandler(err, 'get-from-db');
                    sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND);
                    return;
                }
                if(data) {
                    sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS, data);
                    return;
                }
            });
        }
        else{
            errorHandler('Data Not Found!')
            sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND);
            return;
        }
    });
}

exports.updateUserInfoInDB = function (key, data, res, dbIndex){
    let db = DatabaseConnection();

    try{
        connectToDB(dbIndex);
        db.exists(key, (err, ok) => {
            if(err){
                errorHandler(err, 'update-data-in-db');
                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                return;
            }
            if(ok === 1){
                db.hgetall(key, (err, userData) => {
                    if(err) {
                        errorHandler(err, 'update-data-in-db');
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                        return;
                    }
                    if(userData){
                        let oldUserInfo = userData;
                        let newUserInfo = data;
                        let omitNull = obj => {
                            Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete(obj[k]))
                            return obj;
                        }
                        let updatingInfo = {...omitNull(oldUserInfo),...omitNull(newUserInfo)}

                        //change user info in db
                        db.hmset(key, updatingInfo, (err, reply) => {
                            if(err) {
                                errorHandler(err, 'update-data-in-db');
                                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                                return;
                            }
                            if(reply === 'OK') {
                                sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS);
                                return;
                            }
                            else {
                                errorHandler('error in update data in db!', 'update-data-in-db');
                                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                                return;
                            }
                        });
                    }
                    else {
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR);
                        return;
                    }
                });
            }
            else {
                sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND);
                return;
            }
        });
    }
    catch(error){
        errorHandler(err, 'update-data-in-db');
        sendResponse(res, statusCodes.DB_ERROR, error.data);
        return;
    }
}

