'use strict';
const { users, meetups } = require('./../../database/db.postgres.config');
const itemNotFoundException = require('./../../Exceptions/ItemNotFoundException');

exports.meetupUserExists = async function(user_id = null, meetup_id = null) {
    user_id = parseInt(user_id);
    meetup_id = parseInt(meetup_id);
    if (user_id != null) {
        const sql = `SELECT USER_ID, USERNAME FROM users U WHERE U.user_id = ${user_id};`;
        let result = await users.sequelize.query(sql);
        if (result[0].length !== 1) {
            throw new itemNotFoundException('User not found');
        }
    }
    if (meetup_id != null) {
        const sql = `SELECT meetup_id FROM meetups M WHERE M.meetup_id = ${meetup_id};`;
        let result = await meetups.sequelize.query(sql);
        if (result[0].length !== 1) {
            throw new itemNotFoundException('Meetup not found');
        }
    }
    return true;
};