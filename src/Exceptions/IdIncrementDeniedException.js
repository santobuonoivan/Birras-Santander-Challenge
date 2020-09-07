class IdIncrementDeniedException extends require('./AppError'){
    constructor (message){
        super(message||'DB process error', 500)
    }
}

module.exports = IdIncrementDeniedException;