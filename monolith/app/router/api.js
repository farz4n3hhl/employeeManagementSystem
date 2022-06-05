const controllers = require('../controllers/controllers');

exports.routes = {
    '/signup': {
        POST: {
            function: controllers.signup,
            dataNeeded: true,
            queryNeeded: false
        }
    },
    '/login': {
        POST: {
            function: controllers.login,
            dataNeeded: true,
            queryNeeded: false
        }
    },
    '/logout': {
        GET: {
            function: controllers.logout,
            dataNeeded: false,
            queryNeeded: false
        }
    },
    '/user/data': {
        PUT: {
            function: controllers.editUserData,
            dataNeeded: true,
            queryNeeded: false
        },
        GET: {
            function: controllers.getUserData,
            dataNeeded: false,
            queryNeeded: false
        }
    },
    '/attendance': {
        GET : {
            function: controllers.getSubmitAndLeaveTimes,
            dataNeeded: false,
            queryNeeded: false
        },
    },
    '/attendance/time': { 
        POST :{
            function: controllers.submitAttendAndLeaveTime,
            dataNeeded: true,
            queryNeeded: false
        }
    },
    '/attendance/days': {
        POST :{
            function: controllers.submitLeaveDays,
            dataNeeded: true,
            queryNeeded: false
        }
    },
    '/salary': {
        GET :{
            function: controllers.getPayroll,
            dataNeeded: false,
            queryNeeded: false
        }
    },
}
