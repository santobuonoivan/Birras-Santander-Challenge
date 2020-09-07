//'use strict';
const express = require('express');
const router = express.Router();
const authController = require('./AuthController');
const cors = require('cors');

router.post('/',cors(),authController.authenticate);

module.exports = router;