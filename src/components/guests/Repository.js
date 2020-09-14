'use strict';

const { guests } = require('../../database/db.postgres.config');
const itemNotFoundException = require('../../Exceptions/ItemNotFoundException');
const idIncrementException = require('../../Exceptions/IdIncrementDeniedException');
const appError = require('./../../Exceptions/AppError');

exports.getAllGuestsMeetup = async function(meetup_id) {
    try {
        const query =
            `SELECT M.name meetup_name, U.name, U.username, U.user_id
            FROM guests G 
            LEFT JOIN meetups M ON M.meetup_id = G.meetup_id
            LEFT JOIN users U ON U.user_id = G.user_id
            WHERE G.meetup_id = ${meetup_id};`;
        let result = await guests.sequelize.query(query);
        if (result[0].length) {
            return result[0];
        } else
            throw new itemNotFoundException('Meetup not found or haven\'t guests ');
    } catch (e) {
        console.log(e.message);
        throw e;
    }
};

exports.createGuest = async function(meetup_id, user_id) {

    let cont = 0;
    let result;

    while (cont < 3) {
        try {
            result = await guests.create({ meetup_id, user_id, checkin: false });
            break;
        } catch (e) {
            ++cont;
        }
    }
    if (cont >= 3) throw new idIncrementException();

    return result;
};

exports.checkInGuest = async function(meetup_id, user_id) {
    try {

        const meetup = await guests.update({ checkin: true }, { where: { meetup_id: parseInt(meetup_id), user_id: parseInt(user_id) } });
        if (meetup < 1) { throw new itemNotFoundException('error guest not found') };
        return { message: 'checkin guest successful' }
    } catch (e) {
        console.log({ error: e });
        throw new itemNotFoundException(`cant checkin guest [${e.message}]`);
    }
};

exports.deleteGuest = async function(meetup_id, user_id) {
    try {
        const meetup = await guests.destroy({ where: { meetup_id: meetup_id, user_id: user_id } });
        if (meetup < 1) { throw new appError('error guest not found') };
        return { message: 'guest delete successful' }
    } catch (e) {
        console.log({ error: e });
        throw new appError(`cant delete guest [${e.message}]`);
    }
};