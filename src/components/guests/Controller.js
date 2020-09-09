const guestRepository = require('./Repository');

exports.getAllGuestsMeetup = async function(req,res,next){
    const {meetup_id} = req.params;
    try {
        let guests = await guestRepository.getAllGuestsMeetup(meetup_id);
        return res.status(200).json(guests);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.createGuest = async function(req,res,next){
    const {meetup_id,user_id} = req.params;
    try {
        let guest = await guestRepository.createGuest(meetup_id,user_id);
        return res.status(201).send({guest: guest, status:201});
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.inscriptionGuest = async function(req,res,next){
    const {meetup_id} = req.params;
    const {user_id} = req.user;
    try {
        let guest = await guestRepository.createGuest(meetup_id,user_id);
        return res.status(201).send({guest: guest, status:201});
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};


exports.checkInGuest = async function(req,res,next){
    try {
        const {meetup_id,user_id} = req.params;
        let write = await guestRepository.checkInGuest(meetup_id,user_id);
        return res.status(200).json(write);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

exports.deleteGuest = async function(req,res,next){
    try {
        const {meetup_id,user_id} = req.params;
        let write = await guestRepository.deleteGuest(meetup_id,user_id);
        return res.status(200).json(write);
    }catch (e) {
        if(e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({error:e.message});
        return res.status(400).json({error:e.message})
    }
};

