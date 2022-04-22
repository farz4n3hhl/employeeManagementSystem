const adminControllers = require('../../controllers/admin.controllers')
// const signupSchema = require('../schemas/signup-schema.json')

const adminRoutes = {
    '/employeeService/employees': {
        GET : {
            function: adminControllers.getUserEmployees,
            dataNeeded: false,
            queryNeeded: true
        }
    },
    // '/employeeService/admin': {
    //     GET : {
    //         function: adminControllers.addAdmin,
    //         dataNeeded: false,
    //         queryNeeded: false
    //     },
    //     DELETE : {
    //         function: adminControllers.delAdmin,
    //         dataNeeded: true,
    //         queryNeeded: false
    //     }
    // }
}


module.exports = adminRoutes