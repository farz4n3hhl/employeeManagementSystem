const controllers = require('../controllers/controllers');

exports.routes = {
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
    }
}
