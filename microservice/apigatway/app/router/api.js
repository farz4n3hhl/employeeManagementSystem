 const config = require('../../config');
 const host = config.serverOptions.hostname;
 const ports = config.ports;

 function hey(req, res) {
     res.end('SERVER IS ON! :D')
 }
module.exports = {
    '/': {
        GET : {
            function: hey,
            dataNeeded: false,
            queryNeeded: false
        },
    },
    '/login': `http://usermanagement:${ports.userManagement}`,
    '/signup': `http://usermanagement:${ports.userManagement}`,
    '/logout': `http://usermanagement:${ports.userManagement}`,

    '/attendance': `http://attendanceandleavemanagement:${ports.attendanceAndLeaveManagement}`,
    '/attendance/time': `http://attendanceandleavemanagement:${ports.attendanceAndLeaveManagement}`,
    '/attendance/days': `http://attendanceandleavemanagement:${ports.attendanceAndLeaveManagement}`,

    '/user/data': `http://datamanagement:${ports.dataManagement}`,
    
    '/salary': `http://salarymanagement:${ports.salaryManagement}`
 }