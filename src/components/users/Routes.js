'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('../../middleware/Authentication');

//const authorization = require('./../../middleware/Authorization');
const {hasCreateUser, hasUpdateUser, hasDeleteUser } = require('./validator/UserValidator');

const userController = require('./Controller');

router.post('/',[cors(), authentication,/* hasCreateUser*/ ], userController.createUser);
router.put('/:user_id',[cors(), authentication,/* hasUpdateUser*/ ], userController.updateUser);
router.delete('/:user_id',[cors(), authentication,/* hasDeleteUser*/], userController.deleteUser);
router.get('/',[cors(), authentication,], userController.getAllUser);

module.exports = router;