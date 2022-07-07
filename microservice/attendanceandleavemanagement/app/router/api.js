const controllers = require('../controllers/controllers');

exports.routes = {
    '/attendance/time': { 
        POST :{
            function: controllers.submitLeaveTime,
            dataNeeded: true,
            queryNeeded: false
        },
        GET : {
            function: controllers.getLeaveTimes,
            dataNeeded: false,
            queryNeeded: false
        },
    },
    '/attendance/days': {
        POST :{
            function: controllers.submitLeaveDays,
            dataNeeded: true,
            queryNeeded: false
        },
        GET : {
            function: controllers.getLeaveDays,
            dataNeeded: false,
            queryNeeded: false
        },
    }
}
