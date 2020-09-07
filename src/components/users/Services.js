'use strict';
//config
const env = require('dotenv').config();
const tokenExpTime = process.env.TOKEN_LIVE_TIME || 3000;
const _ = require('lodash');


// database
const { users } = require('../../database/db.postgres.config');
// librerias
const config = require('config');
const jwt = require('jsonwebtoken');

// exceptions
const usernameEmailExistEx = require('../../Exceptions/UsernameEmailExistsException');
const appException = require('../../Exceptions/AppError');

exports.usernameEmailExists = async function (username = null, email = null,user_id) {
    user_id = parseInt(user_id);
    if(username === undefined || email === undefined)
        throw new appException('El email es requerido');
    if(username != null){
        const sql = `SELECT USER_ID, USERNAME FROM USERS WHERE lower(USERNAME) = lower('${username}');`;
        let result = await  users.sequelize.query(sql);
        if(result[0].length > 0 && result[0][0].user_id !== user_id){
            throw new usernameEmailExistEx('El username ya está siendo usado');
        }
    }
    if(email != null){
        const sql = `SELECT USER_ID, EMAIL FROM USERS WHERE EMAIL = '${email}'`;
        let result = await  users.sequelize.query(sql);
        if(result[0].length >0 && result[0][0].user_id !== user_id){
            throw new usernameEmailExistEx('El email ya está siendo usado');
        }
    }
    return true;
};

exports.generateToken = async function(user){
    //Construyo un token con la información mas básica del usuario para luego tomar la información correspondiente.
    let tempUser = _.pick(user, ['email', 'perfil', 'name', 'last_name','user_id','username']);

    let key = config.get('jwtPrivateKey2');

    const token = jwt.sign({user:tempUser}, key, {algorithm:'HS256',expiresIn: tokenExpTime});
    return token;
};


function excludePassword(user){
    let newUser = Object.keys(user).reduce((object, key) => {
        if (key !== '_password' || key !== 'PASSWORD' || key !== 'password' ) {
            object[key] = user[key]
        }
        return object
    }, {})
    return newUser;
}

exports.exculdepassword = excludePassword;