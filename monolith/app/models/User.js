let { connectToDB, DatabaseConnection } = require('../../database/index')
const { sendResponse } = require('../../utils/response')
const { statusCodes } = require('../../utils/statusCodes')
const { messages } = require('../../utils/messages')
const { dataValidator } = require('../../utils/validatation')
const userSchema = require('./schemas/User.json')
const updateUserSchema = require('./schemas/UpdateUser.json')


class User {
    constructor(data=null, type='post'){
        if(data){
            let schema = {}
            if(type === 'post'){
                schema = userSchema
            }else {
                schema = updateUserSchema
            }

            this.validationResult = dataValidator(schema, data)
            if(this.validationResult.errors.length <= 0){
                this.username = data.username || null
                this.data = {}
                this.data.nationalCode = data.nationalCode || null
                this.data.jobSkills = data.jobSkills || null
                this.data.jobTitle = data.jobTitle || null
                this.parent = data.parent || null
            }
        }else{
            this.validationResult = null
            this.username = null
            this.data = {}
            this.data.nationalCode = null
            this.data.jobSkills = null
            this.parent = null
        }
    }

    userValidation() {
        if(this.validationResult.errors.length > 0) return false
        else return true
    }

    /* db methods */
    addUserToDB(res){
        let db = DatabaseConnection()
        let user = this

        //check if username is in db
        connectToDB(0)
        db.exists(user.username, function(err, reply) {
            if (err) {
                console.log(err)
                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
            }
            if (reply === 1) {
                sendResponse(res, statusCodes.DUPLICATE_ID, messages.DUPLICATE_ID)
            }else{
                //check if parent's username is in db
                db.exists(user.parent, function(err, reply){
                    if (err) {
                        console.log(err)
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                    }
                    if(reply === 1) {
                        db.hmset(user.username, 
                        [
                            'username', user.username,
                            'nationalCode', user.data.nationalCode,
                            'jobSkills', JSON.stringify(user.data.jobSkills),
                            'jobTitle', user.data.jobTitle,
                            'parent', user.parent,
                        ]
                        , (err, reply) => {
                            if(err) {
                                console.log(err);
                                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                            }
                        })

                        //store user parent in db1/dataMap
                        connectToDB(1)
                        db.rpush(user.parent, user.username, function(err, ok){
                            if(err){
                                console.log(err);
                                connectToDB(0)
                                db.hdel(user.username)
                                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                            }
                            if (ok){
                                sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
                            }
                        })
                    }else{
                        console.log('Error: User parent does not exist!')
                        sendResponse(res, statusCodes.BAD_REQUEST, messages.NO_PARENT)
                    }
                })
            }
        });
    }

    getUserInfoFromDB(username, res){
        let db = DatabaseConnection()
        let user = this

        connectToDB(0)
        db.exists(username, function(err, reply) {
            if(err){
                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
            } 
    
            if(reply===1) {
                db.hgetall(username, function(err, userData) {
                    if(err){
                        sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND)
                    }
                    if(userData) {
                        user.username = username
                        user.data.nationalCode = userData.nationalCode
                        user.data.jobSkills = userData.jobSkills
                        user.data.jobTitle = userData.jobTitle
                        user.parent = userData.parent

                        sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS, {
                            username: user.username, 
                            jobSkills: user.data.jobSkills, 
                            jobTitle: user.data.jobTitle, 
                            nationalCode: user.data.nationalCode,
                            parent: user.parent
                        })
                    }
                    
                });
            }else{
                sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND)
            }
        })
    }

    updateUserInfoInDB(res){
        let username = this.username
        let db = DatabaseConnection()
        let user = this

        try{
        connectToDB(0)
        db.exists(username, (err, ok) => {

            if(err){
                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
            }
            if(ok === 1){
                db.hgetall(username, (err, userData) => {
                    if(err) {
                        console.log(err)
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                    }
                    if(userData){
                        //fetching old user info
                        let oldUserInfo = userData

                        //setting new user info
                        let newUserInfo = {
                            username: username, 
                            parent: user.parent, 
                            jobSkills: ((user.data.jobSkills) ? JSON.stringify(user.data.jobSkills) : null), 
                            jobTitle: user.data.jobTitle, 
                            nationalCode: user.data.nationalCode
                        }   
                        //setting updating user info
                        let omitNull = obj => {
                            Object.keys(obj).filter(k => obj[k] === null).forEach(k => delete(obj[k]))
                            return obj
                        }
                        let updatingInfo = {...omitNull(oldUserInfo),...omitNull(newUserInfo)}

                        //change user info in db
                        db.hmset(username, updatingInfo, (err, reply) => {
                            if(err) {
                                console.log(err);
                                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                            }
                            if(reply === 'OK'){
                                //update userInfo in userObject
                                user.data.jobSkills = newUserInfo.jobSkills
                                user.data.jobTitle = newUserInfo.jobTitle 

                                sendResponse(res, statusCodes.SUCCESS, messages.SUCCESS)
                                return
                            }else{
                                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                            }
                        })
                    }else{
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                    }
                })
            }else{
                sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND)
            }
        })
        }catch(error){
            sendResponse(res, statusCodes.DB_ERROR, error.data)
        }
    }

    deleteUserInfoInDB(res){
        let username = this.username
        let parent = this.parent
        let db = DatabaseConnection()

        try{
            //store user data in db0/dataStorage
            connectToDB(0)
            db.exists(username, function(err, reply) {
                if (err) {
                    console.log(err)
                    sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                }
                if (reply === 1) {
                    connectToDB(1)
                    db.exists(parent, function(err, ok){
                        if (err) {
                            console.log(err)
                            sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                        }
                        if(ok === 1) {
                            db.lrem(parent, 1, username, function(err, OK){
                                if(OK === 1){
                                    connectToDB(0)
                                    db.del(username)
                                    sendResponse(res, statusCodes.SUCCESS, messages.DEL_SUCCESS)
                                }
                                else
                                    sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                            })
                           
                        }else{
                            console.log('Error: User parent does not exist!')
                            sendResponse(res, statusCodes.BAD_REQUEST, messages.NO_PARENT)
                        }
                    })
                } 
                else {
                    sendResponse(res, statusCodes.NOT_FOUND, messages.NOT_FOUND)
                }
            })
        }catch(err){
            console.error(err.message);
        }
    }

    getUserEmployeesFromDB(res){
        let parent = this.username
        let db = DatabaseConnection()

        connectToDB(1)
        db.exists(parent, function(err, reply) {
            if (err) {
                console.log(err)
                sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
            }
            if (reply === 1) {
                db.lrange(parent, 0, -1, function(err, employees){
                    if(err) console.log(err);
                    if(employees){
                        // console.log(reply);
                        sendResponse(res, statusCodes.SUCCESS, messages.GENERAL_SUCCESS, employees)
                    }else{
                        sendResponse(res, statusCodes.DB_ERROR, messages.DB_ERROR)
                    }
                })
            }else{
                sendResponse(res, statusCodes.SUCCESS, messages.NO_EMPLOYEE, [])
            }
        })
    }
}

module.exports = User