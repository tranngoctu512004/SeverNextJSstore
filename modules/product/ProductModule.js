const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: [{
        type: String // Giả sử hình ảnh là đường dẫn URL, bạn có thể thay đổi kiểu dữ liệu nếu cần
    }],
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
    size: [{
        type: String 
    }],
    sizeUser: {
        type: Number,
        required: false
    },
    color: [{
        type: String
    }],
    productDescription: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subParentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
});

module.exports = mongoose.model('Product', ProductSchema);
