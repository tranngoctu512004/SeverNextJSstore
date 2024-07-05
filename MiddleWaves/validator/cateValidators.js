const { body, validationResult } = require('express-validator');

const addCategoryValidator = [
    body('cateID').notEmpty().withMessage('ID danh mục không được để trống'),
    body('cateName').notEmpty().withMessage('Tên danh mục không được để trống')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);

    // Nếu không có lỗi validation, tiếp tục sang middleware tiếp theo
    if (errors.isEmpty()) {
        return next();
    }

    // Trường hợp đặc biệt: không có các trường `cateID` và `cateName`
    const extractedErrors = {};
    errors.array().forEach(error => {
        extractedErrors[error.param] = error.msg;
    });

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    addCategoryValidator,
    validate
};
