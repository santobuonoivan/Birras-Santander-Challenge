'use strict';
const bcrypt = require('bcryptjs');
const userService = require('../users/Services');
const userRepository = require('./../users/Repository');
const standardException = require('../../Exceptions/StandardException');
const _ = require('lodash');

exports.authenticate = async (req, res, next) => {
    let {username} = req.body;
    username = _.toLower(username);
    console.log('Authenticating');
    let user;
    try {
        user = await userRepository.findUserByUsername(username);
        if(!user) throw new standardException('Bad credentials');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) throw new standardException('Bad credentials');
        delete user.password;
        let token = await userService.generateToken(user);
        return res.status(200).json({'token':token,perfil: user.perfil})
    }catch (e) {
        console.log('authentication');
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
}