let Validator = require('jsonschema').Validator;
let v = new Validator();

exports.dataValidator = function(schema, data){
    let result = v.validate(data, schema, {nestedErrors: true});

    return result
}