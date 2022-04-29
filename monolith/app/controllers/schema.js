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
exports.editUserDataSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "editUserData",
    "type": "object",
    "properties": {
        "phoneNumber": {
            "type": "string",
            "minLength": 11
        },
        "email": {
            "type": "string",
            "minLength": 10
        },
        "role": {
            "type": "string",
            "minLength": 6
        }
    },
    "additionalProperties": false,
}
exports.submitTimeDataSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "submitTimeData",
    "type": "object",
    "properties": {
        "date": {
            "type": "string",
            "minLength": 6
        },
        "attendanceTime": {
            "type": "string",
            "minLength": 3
        },
        "leaveTime": {
            "type": "string",
            "minLength": 3
        },
        "leaveDay": {
            "type": "boolean",
        }
    },
    "additionalProperties": false,
    "required": ["date", "attendanceTime", "leaveTime", "leaveDay"]
}
exports.submitDayDataSchema = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "title": "submitDayData",
    "type": "object",
    "properties": {
        "date": {
            "type": "string",
            "minLength": 6
        },
        "leaveDay": {
            "type": "boolean",
        }
    },
    "additionalProperties": false,
    "required": ["date", "leaveDay"]
}
