const { body, validationResult } = require('express-validator');

const validateStudent = [
    body('Name').notEmpty().withMessage('Name Is Required'),
    body('Email').notEmpty().withMessage('Email Is Required'),
    body('Age').notEmpty().withMessage('Email Is Required'),
    (req, res, next) => {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateStudent };