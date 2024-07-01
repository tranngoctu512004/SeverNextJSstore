const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    subcateID: {
        type: String,
        required: true
    },
    subcateName: {
        type: String,
        required: true
    },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }

});

module.exports = mongoose.model('SubCategory', SubCategorySchema); 