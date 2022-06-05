 const config = require('../../config');
 const host = config.serverOptions.hostname;
 const ports = config.ports;

module.exports = {
    '/login': `http://${host}:${ports.userManagement}`,
    '/signup': `http://${host}:${ports.userManagement}`,
    '/logout': `http://${host}:${ports.userManagement}`,

    '/attendance': `http://${host}:${ports.attendanceAndLeaveManagement}`,
    '/attendance/time': `http://${host}:${ports.attendanceAndLeaveManagement}`,
    '/attendance/days': `http://${host}:${ports.attendanceAndLeaveManagement}`,

    '/user/data': `http://${host}:${ports.dataManagement}`,
    
    '/salary': `http://${host}:${ports.salaryManagement}`
 }