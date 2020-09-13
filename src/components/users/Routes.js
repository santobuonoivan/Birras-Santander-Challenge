'use strict'
const express = require('express');
const router = express.Router();
const cors = require('cors');
const authentication = require('../../middleware/Authentication');
const authorization = require('./../../middleware/Authorization');
const { hasCreateUser, hasUpdateUser, hasDeleteUser } = require('./validator/UserValidator');

const userController = require('./Controller');

router.get('/', [cors(), authentication, authorization('USERS', 'GET_ALL')], userController.getAllUser);
router.post('/', [cors(), authentication, hasCreateUser, authorization('USERS', 'CREATE')], userController.createUser);
router.put('/:user_id', [cors(), authentication /*, hasUpdateUser*/ , authorization('USERS', 'UPDATE')], userController.updateUser);
router.delete('/:user_id', [cors(), authentication /*, hasDeleteUser*/ , authorization('USERS', 'DELETE')], userController.deleteUser);

module.exports = router;