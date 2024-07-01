const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    cateID: {
        type: String,
        required: true
    },
    cateName: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Category', categorySchema); 