const jwt = require('jsonwebtoken');
const User = require('../modules/user/UserModule')
require('dotenv').config();

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: 'You must be logged in, key not given'
        })
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: 'Invalid token'
            })
        }
        const { _id } = payload;
        User.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        })

    })
}