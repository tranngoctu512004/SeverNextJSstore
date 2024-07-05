const { body, validationResult } = require('express-validator');

const addSliderValidator = [
    body('image').notEmpty().withMessage('Image is required'),
    body('path').notEmpty().withMessage('Path is required')
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
    addSliderValidator,
    validate
};
