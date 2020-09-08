'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('../../middleware/Authentication');

//const authorization = require('./../../middleware/Authorization');

const meetupController = require('./Controller');

router.get('/',[cors(), authentication,], meetupController.getAllMeetup);
router.get('/:meetup_id',[cors(), authentication,], meetupController.getOneMeetup);
router.get('/info/:meetup_id',[cors(), authentication,], meetupController.getInfoMeetup);
router.get('/consuminfo/:meetup_id',[cors(), authentication,], meetupController.getConsumInfoMeetup);
router.post('/',[cors(), authentication,/* hasCreateUser*/ ], meetupController.createMeetup);
router.put('/:meetup_id',[cors(), authentication,/* hasUpdateUser*/ ], meetupController.updateMeetup);
router.delete('/:meetup_id',[cors(), authentication,/* hasDeleteUser*/], meetupController.deleteMeetup);

module.exports = router;