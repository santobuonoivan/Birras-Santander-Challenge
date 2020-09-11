const guestRepository = require('./Repository');
const { use } = require('./Routes');
const guestServices = require('./Services');

exports.getAllGuestsMeetup = async function(req, res, next) {
    const { meetup_id } = req.params;
    try {
        let guests = await guestRepository.getAllGuestsMeetup(meetup_id);
        return res.status(200).json(guests);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.createGuest = async function(req, res, next) {
    const { meetup_id, user_id } = req.params;
    try {
        await guestServices.meetupUserExists(user_id, meetup_id);
        let guest = await guestRepository.createGuest(meetup_id, user_id);
        return res.status(201).send(guest);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.inscriptionGuest = async function(req, res, next) {
    const { meetup_id } = req.params;
    const { user_id } = req.user;
    try {
        await guestServices.meetupUserExists(user_id, meetup_id);
        let guest = await guestRepository.createGuest(meetup_id, user_id);
        return res.status(201).send(guest);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};


exports.checkInGuest = async function(req, res, next) {
    try {
        const { meetup_id, user_id } = req.params;
        let write = await guestRepository.checkInGuest(meetup_id, user_id);
        return res.status(200).json(write);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.deleteGuest = async function(req, res, next) {
    try {
        const { meetup_id, user_id } = req.params;
        let write = await guestRepository.deleteGuest(meetup_id, user_id);
        return res.status(200).json(write);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};