'use strict';
/* Sockets */
const io = require('./../../index').getIO();

exports.sendNotifications = function(message) {
    io.emit('notifications', message);
};
