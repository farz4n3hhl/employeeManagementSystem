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
}
