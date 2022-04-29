
exports.sendResponse = function(res, statusCode, message, data = null){
    const headers  = {
        'content-type': 'application/json',
    }
    res.writeHead(statusCode, '', headers);

    if(data) {
        res.end(JSON.stringify({message: message, result: data}));
        return;
    }
    else {
        res.end(JSON.stringify({message: message}));
        return;
    }
}