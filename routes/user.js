var express = require('express');
var router = express.Router();
var UserController = require('../modules/user/UserController')
router.post('/register', async function (req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await UserController.insert(name, email, password);
        if (user.error) {
            return res.status(user.status).send({ error: user.error });
        }
        res.status(user.status).send({ token: user.token });
    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error.status);
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
            console.log(error);
        }
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserController.login(email, password);
        if (user.error) {
            return res.status(user.status).send({ error: user.error });
        }
        res.status(user.status).send({ token: user.token });

    } catch (error) {
        if (error.status) {
            res.status(error.status).json(error.status);
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
            console.log(error);
        }
    }
});
module.exports = router;