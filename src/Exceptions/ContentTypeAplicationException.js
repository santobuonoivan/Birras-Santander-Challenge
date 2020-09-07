class ContentTypeAplicationException extends require('./AppError'){
    constructor (message){
        super(message||'Invalid Content-Type', 400)
    }
}
module.exports = ContentTypeAplicationException;