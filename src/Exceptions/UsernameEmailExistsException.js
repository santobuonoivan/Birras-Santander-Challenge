class UsernameEmailExistsException extends require('./AppError'){
    constructor (message){
        super(message||'Data not found', 400)
    }
}
module.exports = UsernameEmailExistsException;