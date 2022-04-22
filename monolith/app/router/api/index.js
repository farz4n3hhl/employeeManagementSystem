const adminRoutes = require('./admin.routes')
const userRoutes = require('./user.routes')

exports.routes = {...adminRoutes, ...userRoutes}
