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
