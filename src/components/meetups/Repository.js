'use strict';

const { meetups } = require('../../database/db.postgres.config');
const itemNotFoundException =  require('../../Exceptions/ItemNotFoundException');
const idIncrementException = require('../../Exceptions/IdIncrementDeniedException');
const appError = require('./../../Exceptions/AppError');
const moment = require('moment');

exports.createMeetup = async function (meetup) {

    let cont = 0;
    let max = await meetups.sequelize.query(`SELECT MAX(m.meetup_id ) AS MAXID FROM meetups m`);
    max = max[0][0].maxid;
    max = (max == null || isNaN(max))? 1 : ++max;
    let result;

    while (cont < 3) {
        try{
            meetup.meetup_id = max;
            meetup.date = moment(meetup.date,'DD/MM/YYYY').format('DD/MM/YYYY');
            meetup.time = moment(meetup.time,'HH:mm').format('HH:mm');
            result = await meetups.create(meetup); // CREATE MEETUP
            break;
        }catch (e) {
            ++cont;
            ++max;
        }
    }
    if(cont >= 3)throw new idIncrementException();

    return result;
};

exports.updateMeetup = async function (meetup_id, meetup) {

    try{
        let result = await meetups.update(meetup,{where: {meetup_id: meetup_id}});
        return { message: 'meetup update successful',status: 201}
    }catch (e) {
        console.log({error:e});
        throw new appError('error meetup update');
    }
};

exports.deleteMeetup = async function (meetup_id) {
    try{
        const meetup = await meetups.destroy({where:{meetup_id:meetup_id}});
        if(meetup < 1){ throw new appError('error meetup no encontrado') };
        return { message: 'meetup delete successful', status: 200 }
    }catch (e) {
        console.log({error: e});
        throw new appError(`No se pudo eliminar el usuario [${e.message}]`);
    }
};

/*
exports.findMeetupByMeetupname = async function(username){

    let result;
    try{
        result = await meetups.findOne({where:{username: sequelize.where(sequelize.fn('LOWER', sequelize.col('username')), 'LIKE', '%' + username + '%')}});


    }catch (e) {
        console.log(e.message);
    }
    if(result){
        return result.dataValues;
    }
    else
        throw new itemNotFoundException('Meetup not found');
};
*/
exports.getOneMeetup = async function(meetup_id){
    try{
        let result = await meetups.findOne({where:{meetup_id:meetup_id}});
        if(result){
            return result;
        }
        else
            throw new itemNotFoundException('Meetup not found');
    }catch (e) {
        console.log(e.message);
        throw e;
    }
};

exports.getAllMeetup = async function(){
    try{
        const result = await meetups.findAll();
        return result;
    }catch (e) {
        throw new itemNotFoundException('Meetup not found');
    }
};
