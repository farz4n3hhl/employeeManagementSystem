const routes = require('./api')
const parser = require('url')


exports.Router = function(req, res){
    const url = parser.parse(req.url);

    // check if request-url is hosted by server-routes
    if(routes.hasOwnProperty(url.pathname)){
        if (url.pathname === '/') {
            return routes[url.pathname][req.method].function(req, res);
        }
        console.log('Request-> ', url.pathname, '|', req.method);
        return `${routes[url.pathname]}${url.pathname}`;
    }
    
    // route not available
    else{
        return null
    }   
}