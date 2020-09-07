const userRepository = require('./Repository');
const userService = require('./Services');

exports.createUser = async function(req,res,next){
    const {username, email} = req.body;
    try {
        let availability = await userService.usernameEmailExists(username,email);
        if(availability){
            let uss = await userRepository.createUser(req.body);
            delete uss.password;
            return res.status(201).send({user: uss, status:201});
        }
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.updateUser = async function(req,res,next){
    try {
        let userEmailExist = await userService.usernameEmailExists(req.body.username,req.body.email,req.params.user_id);
        let write = await userRepository.updateUser(req.params.user_id, req.body);
        return res.status(201).json(write);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.deleteUser = async function(req,res,next){
    try {
        let write = await userRepository.deleteUser(req.params.user_id);
        return res.status(200).json(write);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.getAllUser = async function(req,res,next){
    try {
        let users = await userRepository.getAllUser();
        return res.status(200).json(users);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.getOneUser = async function(req,res,next){
    try {
        const { user_id } = req.params;
        let users = await userRepository.getOneUser(user_id);
        return res.status(201).json(users);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};