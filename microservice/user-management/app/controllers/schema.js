exports.signupSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "signup",
    "type": "object",
    "properties": {
        "password": {
            "type": "string",
            "minLength": 6
        },
        "firstName": {
            "type": "string",
            "minLength": 3
        },
        "lastName": {
            "type": "string",
            "minLength": 3
        },
        "phoneNumber": {
            "type": "string",
            "minLength": 11
        },
        "email": {
            "type": "string",
            "minLength": 10
        },
        "nationalCode": {
            "type": "string",
            "minLength": 6
        },
        "role": {
            "type": "string",
            "minLength": 6
        }
    },
    "additionalProperties": false,
    "required": [
        "password", 
        "firstName", 
        "lastName", 
        "phoneNumber", 
        "email", 
        "nationalCode", 
        "role"
    ]
}
exports.loginSchema = {
"$schema": "http://json-schema.org/draft-04/schema#",
"title": "login",
"type": "object",
"properties": {
    "username": {
        "type": "string",
        "minLength": 6
    },
    "password": {
        "type": "string",
        "minLength": 6
    }
},
"additionalProperties": false,
"required": [
    "username", 
    "password"
]
}