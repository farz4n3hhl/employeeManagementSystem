const Validator = require('jsonschema').Validator;
const { sendResponse } = require('./response')
const { statusCodes } = require('./statusCodes')
const { messages } = require('./messages')

const v = new Validator();

exports.dataValidator = function(req, res, schema){
    try{
        if (!req.data) {
            sendResponse(res, statusCodes.BAD_REQUEST, messages.BAD_REQUEST);
        }
        const validationRes = v.validate(req.data, schema, {nestedErrors: true});
        if (validationRes.errors?.length) {
            sendResponse(res, statusCodes.BAD_REQUEST, messages.BAD_REQUEST, validationRes.errors);
        }
    }
    catch(error) {
        throw error;
    }
}

