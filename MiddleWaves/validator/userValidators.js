const { body, validationResult } = require('express-validator');

const registerValidator = [
    body('name').notEmpty().withMessage('Họ và tên không được để trống'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const loginValidator = [
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    
    // Nếu không có lỗi validation, tiếp tục sang middleware tiếp theo
    if (errors.isEmpty()) {
        return next();
    }

    // Trích xuất lỗi và trả về dưới dạng JSON
    const extractedErrors = errors.array().reduce((acc, error) => {
        acc[error.param] = error.msg;
        return acc;
    }, {});

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    registerValidator,
    loginValidator,
    validate
};
