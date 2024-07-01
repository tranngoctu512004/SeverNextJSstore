const mongoose = require('mongoose');
const sliderSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model('Slider', sliderSchema); 