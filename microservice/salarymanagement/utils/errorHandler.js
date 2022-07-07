exports.errorHandler = function(err, event) {
    const errorObject = {
        at: event,
        reason: err
    }
    console.error(errorObject);
}