
//server config
const serverOptions = {
    hostname: '127.0.0.1',
    port: 3000
} 

//microServicesPorts
const ports = {
    attendanceAndLeaveManagement: 80,
    dataManagement: 81,
    salaryManagement: 82,
    userManagement: 83
}


module.exports = {
    serverOptions,
    ports
}
