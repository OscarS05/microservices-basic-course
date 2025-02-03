function err(message, code){
    const error = new Error(message);

    if(code){
        error.statusCode = code;
    }
    return error;
}

module.exports = err;