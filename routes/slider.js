var express = require('express');
var router = express.Router();
var SliderController = require('../modules/slider/SliderController');
const { addSliderValidator, validate } = require('../MiddleWaves/validator/sliderValidators');
router.post('/getAll', async function (req, res) {
    try {
        const AllSlider = await SliderController.getAll();
        res.status(200).json(AllSlider)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
})
router.post('/addSlider', addSliderValidator, validate, async function (req, res) {
    const { image, path } = req.body;
    try {
        const newSiler = SliderController.insert(image, path)
        res.status(200).json(newSiler)
    } catch (error) {
        if (error.status) {
            res.status(error.status).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }

    }

})




module.exports = router;