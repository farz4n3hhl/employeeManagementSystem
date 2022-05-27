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
