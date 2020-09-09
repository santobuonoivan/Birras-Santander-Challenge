'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('./../../middleware/Authentication');
const authorization = require('./../../middleware/Authorization');
const guestController = require('./Controller');


router.get('/:meetup_id',[cors(), authentication, authorization('GUESTS', 'GET_ALL')], guestController.getAllGuestsMeetup);
router.post('/:meetup_id/:user_id',[cors(), authentication, authorization('GUESTS', 'CREATE') ], guestController.createGuest);
router.post('/inscription/:meetup_id',[cors(), authentication, authorization('GUESTS', 'INSCRIPTION') ], guestController.inscriptionGuest);
router.post('/check_in/:meetup_id/:user_id',[cors(), authentication, authorization('GUESTS', 'CHECK_IN') ], guestController.checkInGuest);
router.delete('/:meetup_id/:user_id',[cors(), authentication, authorization('GUESTS', 'DELETE')], guestController.deleteGuest);

module.exports = router;