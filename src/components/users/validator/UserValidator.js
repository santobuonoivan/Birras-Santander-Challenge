const Joi = require('@hapi/joi');
const { joiMsgError } = require('../../validate/errorMessages');

exports.hasCreateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string().required()
                .regex(/^[\w]+(\s\w+)*$/).min(1).max(30).trim().label('Nombre'),
            email: Joi.string()
                .email({minDomainSegments: 1, tlds: {allow: ['com', 'net', 'mx', 'ar', 'es']}})
                .max(255).trim().lowercase({force: true}).required().label('Email'),
            username: Joi.string().trim().allow("").allow(false).allow(null).label('Nombre de usuario'),
            password: Joi.string().trim().regex(/^[\w]+(\w+)*$/).min(10).max(255).required().label('Contraseña'),

        });

        let {error, value} = schema.validate(req.body);
        if (error)
            return res.status(400).json({error: joiMsgError(error.details[0])});
        req.body = value;
        return next();
    } catch (e) {
        return res.status(400).json({error: e.message});
    }
};

exports.hasUpdateUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            name: Joi.string()
                .regex(/^[\w]+(\s\w+)*$/).min(1).max(30).trim()
                .allow("").allow(null).label('Nombre'),
            username: Joi.string().trim().allow("").allow(null).label('Nombre de usuario'),
            email: Joi.string()
                .email({ minDomainSegments: 1, tlds: { allow: ['com', 'net', 'mx', 'ar', 'es']}})
                .max(255).trim().lowercase({force: true}).allow("").allow(null).label('Email'),
            password: Joi.string().max(255).allow("").allow(null).label('Contraseña'),
        });

        let {error, value} = schema.validate(req.body);
        if (error)
            return res.status(400).json({error: joiMsgError(error.details[0])});
        req.body = value;
        return next();
    } catch (e) {
        return res.status(e.status).json({error: e.message});
    }
};


exports.hasDeleteUser = async (req, res, next) => {
    try {
        const schema = Joi.object({
            user_id: Joi.number().integer().min(0).positive().required().label('Id de usuario')
        });

        let { error, value } = schema.validate(req.params);
        if ( error ) return res.status(400).json({error: joiMsgError(error.details[0])});

        if( req.user.user_id == value.user_id)
            return res.status(400).json({error: 'No se puede eliminar el usuario con el que inició sesión', status: 400});

        return next();
    } catch (e) {
        return res.status(400).json({error:e.message});
    }
};