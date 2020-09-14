const meetupRepository = require('./Repository');


exports.createMeetup = async function(req, res, next) {
    const { body } = req;
    try {
        let meetup = await meetupRepository.createMeetup(body);
        return res.status(201).send(meetup);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.updateMeetup = async function(req, res, next) {
    try {
        let write = await meetupRepository.updateMeetup(req.params.meetup_id, req.body);
        return res.status(200).json(write);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.deleteMeetup = async function(req, res, next) {
    try {
        let write = await meetupRepository.deleteMeetup(req.params.meetup_id);
        return res.status(200).json(write);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.getAllMeetup = async function(req, res, next) {
    try {
        let meetups = await meetupRepository.getAllMeetup();
        return res.status(200).json(meetups);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.getOneMeetup = async function(req, res, next) {
    try {
        const { meetup_id } = req.params;
        let meetup = await meetupRepository.getOneMeetup(meetup_id);
        return res.status(200).json(meetup);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.getInfoMeetup = async function(req, res, next) {
    try {
        const { meetup_id } = req.params;
        let meetup = await meetupRepository.getInfoMeetup(meetup_id);
        return res.status(200).json(meetup);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};

exports.getConsumInfoMeetup = async function(req, res, next) {
    try {
        const { meetup_id } = req.params;
        let meetup = await meetupRepository.getConsumInfoMeetup(meetup_id);
        return res.status(200).json(meetup);
    } catch (e) {
        if (e instanceof require('../../Exceptions/AppError'))
            return res.status(e.status).json({ error: e.message });
        return res.status(400).json({ error: e.message })
    }
};