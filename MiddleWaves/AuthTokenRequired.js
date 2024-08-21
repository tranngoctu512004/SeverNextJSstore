const jwt = require('jsonwebtoken');
const User = require('../modules/user/UserModule');
require('dotenv').config();

module.exports = (req, res, next) => {
    // Lấy token từ cookie
    const { sessionToken } = req.cookies;

    if (!sessionToken) {
        return res.status(401).json({
            error: 'You must be logged in, session token not provided'
        });
    }

    // Xác thực token
    jwt.verify(sessionToken, process.env.JWT_SECRET, async (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: 'Invalid token'
            });
        }

        const { _id } = payload;

        try {
            const userdata = await User.findById(_id);
            if (!userdata) {
                return res.status(404).json({ error: 'User not found' });
            }
            req.user = userdata;
            next();
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
};
