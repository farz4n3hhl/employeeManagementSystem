
exports.queryObject = function(query){
    let obj = {};
    let pairs = query.split('&');
    for(i in pairs){
        let split = pairs[i].split('=');
        obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
    }
    if(obj.username === 'undefined')
    obj.username = null
    
    return obj
}
