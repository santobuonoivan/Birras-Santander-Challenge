'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('./../../middleware/Authentication');
const authorization = require('./../../middleware/Authorization');
const meetupController = require('./Controller');

router.get('/', [cors(), authentication, authorization('MEETUPS', 'GET_ALL')], meetupController.getAllMeetup);
router.get('/:meetup_id', [cors(), authentication, authorization('MEETUPS', 'GET_ONE')], meetupController.getOneMeetup);
router.get('/info/:meetup_id', [cors(), authentication, authorization('MEETUPS', 'GET_INFO')], meetupController.getInfoMeetup);
router.get('/consuminfo/:meetup_id', [cors(), authentication, authorization('MEETUPS', 'GET_ADMIN_INFO')], meetupController.getConsumInfoMeetup);
router.post('/', [cors(), authentication, authorization('MEETUPS', 'CREATE') /* hasCreateUser*/ ], meetupController.createMeetup);
router.put('/:meetup_id', [cors(), authentication, authorization('MEETUPS', 'UPDATE') /* hasUpdateUser*/ ], meetupController.updateMeetup);
router.delete('/:meetup_id', [cors(), authentication, authorization('MEETUPS', 'DELETE') /* hasDeleteUser*/ ], meetupController.deleteMeetup);

module.exports = router;