class ItemNotFoundException extends require('./AppError'){
    constructor (message){
        super(message||'Data not found', 404)
    }
}
module.exports = ItemNotFoundException;