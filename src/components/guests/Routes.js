'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('../../middleware/Authentication');

//const authorization = require('./../../middleware/Authorization');

const guestController = require('./Controller');


router.get('/:meetup_id',[cors(), authentication,], guestController.getAllGuestsMeetup);
router.post('/:meetup_id/:user_id',[cors(), authentication,/* hasCreateUser*/ ], guestController.createGuest);
router.delete('/:meetup_id/:user_id',[cors(), authentication,/* hasDeleteUser*/], guestController.deleteGuest);

module.exports = router;