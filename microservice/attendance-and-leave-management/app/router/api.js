const controllers = require('../controllers/controllers');

exports.routes = {
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
    }
}
