const userControllers = require('../../controllers/user.controllers')

const userRoutes = {
    '/employeeService':{ 
        GET : {
            function: userControllers.getUserData,
            dataNeeded: false,
            queryNeeded: true
        },
        POST :{
            function: userControllers.sendUserData,
            dataNeeded: true,
            queryNeeded: false
        },
        PUT: {
            function: userControllers.updateUserData,
            dataNeeded: true,
            queryNeeded: false
        },
        DELETE: {
            function: userControllers.deleteUserData,
            dataNeeded: true,
            queryNeeded: false
        },
    }
}


module.exports = userRoutes