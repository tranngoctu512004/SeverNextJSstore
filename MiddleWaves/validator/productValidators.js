const { body, validationResult } = require('express-validator');

const addProductValidator = [
    body('image').notEmpty().withMessage('Hình ảnh không được để trống'),
    body('name').notEmpty().withMessage('Tên sản phẩm không được để trống'),
    body('attribute').notEmpty().withMessage('Thuộc tính sản phẩm không được để trống'),
    body('price').notEmpty().withMessage('Giá sản phẩm không được để trống').isNumeric().withMessage('Giá sản phẩm phải là số'),
    body('size').notEmpty().withMessage('Kích cỡ sản phẩm không được để trống'),
    body('sizeUser').notEmpty().withMessage('Kích cỡ người dùng không được để trống'),
    body('color').notEmpty().withMessage('Màu sắc sản phẩm không được để trống'),
    body('productDescription').notEmpty().withMessage('Mô tả sản phẩm không được để trống'),
    body('parentCategory').notEmpty().withMessage('Danh mục cha không được để trống'),
    body('subParentCategory').notEmpty().withMessage('Danh mục con không được để trống')
];

const productsByCategoryValidator = [
    body('id').notEmpty().withMessage('ID danh mục không được để trống')
];

const productDetailValidator = [
    body('id').notEmpty().withMessage('ID sản phẩm không được để trống')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = errors.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
    }, {});

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    addProductValidator,
    productsByCategoryValidator,
    productDetailValidator,
    validate
};
