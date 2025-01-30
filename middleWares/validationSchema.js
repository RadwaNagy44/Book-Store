const {body} = require('express-validator');

const validationSchema = () => {
    return [
        body('name')
        .notEmpty()
        .withMessage('Name is required')
        .isLength({min: 2})
        .withMessage('Name must be at least 2 characters long'),
        body('price')
        .notEmpty()
        .withMessage('Price is required')
        .isNumeric()
    ]
} 

    module.exports = {
        validationSchema
    };