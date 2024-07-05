const express = require('express');
const router = express.Router();
const requireToken = require('../MiddleWaves/AuthTokenRequired');
const { registerValidator, loginValidator, validate } = require('../MiddleWaves/validator/userValidators');
const UserController = require('../modules/user/UserController');

// Route đăng ký người dùng
router.post('/register', registerValidator, validate, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserController.insert(name, email, password);

        if (user.error) {
            return res.status(user.status).send({ error: user.error });
        }

        res.status(user.status).send({ token: user.token });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: status === 500 ? 'Lỗi máy chủ nội bộ' : error.message });
        console.log(error);
    }
});

// Route đăng nhập
router.post('/login', loginValidator, validate, async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserController.login(email, password);

        if (user.error) {
            return res.status(user.status).send({ error: user.error });
        }

        res.status(user.status).send({ token: user.token });
    } catch (error) {
        const status = error.status || 500;
        res.status(status).json({ error: status === 500 ? 'Lỗi máy chủ nội bộ' : error.message });
        console.log(error);
    }
});

router.get('/me', requireToken, (req, res) => {
    res.json(req.user);
});

module.exports = router;
