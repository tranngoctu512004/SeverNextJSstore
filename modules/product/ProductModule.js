const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    image: [

    ],
    name: {
        type: String,
        required: true
    },
    attribute: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: [],
    sizeUser: {
        type: Number,
        required: false
    },
    color: [], 
    productDescription: {
        type: String,
        required: true
    },
    parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subParentCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },



})
module.exports = mongoose.model('Product', ProductSchema); 