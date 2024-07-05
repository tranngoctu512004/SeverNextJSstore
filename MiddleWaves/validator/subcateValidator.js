const { body, validationResult } = require('express-validator');

const addSubCateValidator = [
    body('subcateID').notEmpty().withMessage('ID is required'),
    body('subcateName').notEmpty().withMessage('Name is required'),
    body('parentCategory').notEmpty().withMessage('Parent category is required')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    const extractedErrors = errors.array().reduce((acc, err) => {
        acc[err.param] = err.msg;
        return acc;
    }, {});

    return res.status(422).json({ errors: extractedErrors });
};

module.exports = {
    addSubCateValidator,
    validate
};
