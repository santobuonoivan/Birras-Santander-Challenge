'use strict';

const { users } = require('../../database/db.postgres.config');
const bcrypt = require('bcryptjs');
const idIncrementException = require('../../Exceptions/IdIncrementDeniedException');
const itemNotFoundException =  require('../../Exceptions/ItemNotFoundException');
const appError = require('../../Exceptions/AppError');
const sequelize = require('sequelize');
const _ = require('lodash');

exports.createUser = async function (user) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    let cont = 0;
    let max = await users.sequelize.query(`SELECT MAX(u.user_id ) AS MAXID FROM users u`);
    max = max[0][0].maxid;
    max = (max == null || isNaN(max))? 1 : ++max;
    let result;

    while (cont < 3) {
        try{
            user.user_id = max;
            result = await users.create(user); // CREATE USER
            break;
        }catch (e) {
            ++cont;
            ++max;
        }
    }
    if(cont >= 3)throw new idIncrementException();

    return user;
};

exports.updateUser = async function (user_id, user) {
    const salt = await bcrypt.genSalt(10);
    if( user.password ) user.password = await bcrypt.hash(user.password, salt);
    try{
        let result = await users.update(user,{where: {user_id: user_id}});
        return { message: 'user update successful',status: 201}
    }catch (e) {
        console.log({error:e});
        throw new appError('error user update');
    }
};

exports.deleteUser = async function (user_id) {
    try{
        const user = await users.destroy({where:{user_id:user_id}});
        if(user < 1){ throw new appError('error user no encontrado') };
        return { message: 'user delete successful', status: 200 }
    }catch (e) {
        console.log({error: e});
        throw new appError(`No se pudo eliminar el usuario [${e.message}]`);
    }
};

exports.findUserByUsername = async function(username){

    let result;
    try{
        result = await users.findOne({where:{username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + username + '%')}});


    }catch (e) {
        console.log(e.message);
    }
    if(result){
        return result.dataValues;
    }
    else
        throw new itemNotFoundException('User not found');
};

exports.getOneUser = async function(user_id){
    try{
        let result = await users.findOne({where:{user_id:user_id}});
        if(result){
            return result;
        }
        else
            throw new itemNotFoundException('User not found');
    }catch (e) {
        console.log(e.message);
        throw e;
    }
};

exports.getAllUser = async function(){
    try{
        const result = await users.findAll({
            attributes: {exclude: ['password']}
        });
        return result;
    }catch (e) {
        throw new itemNotFoundException('User not found');
    }
};