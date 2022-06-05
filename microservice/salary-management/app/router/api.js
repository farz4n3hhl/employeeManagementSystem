const controllers = require('../controllers/controllers');

exports.routes = {
    '/salary': {
        GET :{
            function: controllers.getPayroll,
            dataNeeded: false,
            queryNeeded: false
        }
    },
}