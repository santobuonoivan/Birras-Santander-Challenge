class StandardException extends require('./AppError'){
    constructor (message,status = null){
        super(message|| 'IotService Error', status || 400)
    }
}
module.exports = StandardException;