'use strict';

const { meetups } = require('../../database/db.postgres.config');
const itemNotFoundException = require('../../Exceptions/ItemNotFoundException');
const idIncrementException = require('../../Exceptions/IdIncrementDeniedException');
const notificationsController = require('./../notifications/NotificationController');
const meetupServices = require('./Services');
const appError = require('./../../Exceptions/AppError');
const moment = require('moment');

exports.createMeetup = async function(meetup) {

    let cont = 0;
    let max = await meetups.sequelize.query(`SELECT MAX(m.meetup_id ) AS MAXID FROM meetups m`);
    max = max[0][0].maxid;
    max = (max == null || isNaN(max)) ? 1 : ++max;
    let result;

    while (cont < 3) {
        try {
            meetup.meetup_id = max;
            meetup.date = moment(meetup.date, 'DD/MM/YYYY').format('DD/MM/YYYY');
            meetup.time = moment(meetup.time, 'HH:mm').format('HH:mm');
            result = await meetups.create(meetup); // CREATE MEETUP
            break;
        } catch (e) {
            ++cont;
            ++max;
        }
    }
    if (cont >= 3) throw new idIncrementException();

    notificationsController.sendNotifications(result);
    return result;
};

exports.updateMeetup = async function(meetup_id, meetup) {

    try {
        let result = await meetups.update(meetup, { where: { meetup_id: meetup_id } });
        return { message: 'meetup update successful' }
    } catch (e) {
        console.log({ error: e });
        throw new appError('error meetup update');
    }
};

exports.deleteMeetup = async function(meetup_id) {
    try {
        const meetup = await meetups.destroy({ where: { meetup_id: meetup_id } });
        if (meetup < 1) { throw new appError('error meetup no encontrado') };
        return { message: 'meetup delete successful' }
    } catch (e) {
        console.log({ error: e });
        throw new appError(`No se pudo eliminar el usuario [${e.message}]`);
    }
};


exports.getOneMeetup = async function(meetup_id) {
    try {
        let result = await meetups.findOne({ where: { meetup_id: meetup_id } });
        if (result) {
            return result;
        } else
            throw new itemNotFoundException('Meetup not found');
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

exports.getInfoMeetup = async function(meetup_id) {
    try {
        const query =
            `select 
                        m."name" 
                        ,m."date" 
                        ,m."time" 
                        ,m.city 
                        ,m.description                         
                    from meetups m
                    where m.meetup_id = ${meetup_id}`;

        let result = await meetups.sequelize.query(query);
        if (result[0].length) {
            const { city, date, time, name, description } = result[0][0];
            const temp = await meetupServices.weaterInfo(city, date, time);
            return { name, city, date, time, description, temp };
        } else
            throw new itemNotFoundException('Meetup not found');
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

exports.getConsumInfoMeetup = async function(meetup_id) {
    try {
        const query =
            `select 
                        m."name" 
                        ,m."date" 
                        ,m."time" 
                        ,m.city 
                        ,m.description 
                        , count(g.user_id) guests 
                    from meetups m 
                    left join guests g on g.meetup_id = m.meetup_id 
                    where m.meetup_id = ${meetup_id}
                    group by m."name", m."date", m."time", m.city, m.description;`;

        let result = await meetups.sequelize.query(query);
        if (result[0].length) {
            const { city, date, time, guests, name, description } = result[0][0];
            const temp = await meetupServices.weaterInfo(city, date, time);
            const info = meetupServices.getMeeupInfo(guests, temp)
            return { name, city, date, time, guests, description, info };
        } else
            throw new itemNotFoundException('Meetup not found');
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

exports.getAllMeetup = async function() {
    try {
        const result = await meetups.findAll();
        return result;
    } catch (e) {
        throw new itemNotFoundException('Meetup not found');
    }
};