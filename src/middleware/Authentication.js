const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = async function (req, res, next) {
    const token = req.header('token');
    let key = config.get('jwtPrivateKey2');
    if (!token) return res.status(403).send({message:'Bad Credentials'});
    try {
        const decoded = jwt.verify(token, key,{algorithm:'HS256'});
        req.user = decoded.user;
        next();
    }
    catch (ex) {
        if(ex.name === 'TokenExpiredError')
            return res.status(401).json({message:`El token de seguridad expiró`});
       return res.status(401).send({message:`${ex.message} `});
    }
}