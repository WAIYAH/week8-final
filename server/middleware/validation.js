const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation error',
      errors: errors.array()
    });
  }
  next();
};

// Tutorial validation rules
const tutorialValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['bleeding', 'burns', 'fractures', 'choking', 'cardiac', 'poisoning', 'other'])
    .withMessage('Invalid category'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  
  body('steps')
    .isArray({ min: 1 })
    .withMessage('At least one step is required'),
  
  body('steps.*')
    .trim()
    .notEmpty()
    .withMessage('Each step must not be empty'),
  
  body('videoUrl')
    .optional()
    .isURL()
    .withMessage('Video URL must be a valid URL')
];

// Auth validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const registerValidation = [
  ...loginValidation,
  body('email')
    .custom(async (email) => {
      const Admin = require('../models/Admin');
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        throw new Error('Admin with this email already exists');
      }
    })
];

module.exports = {
  validate,
  tutorialValidation,
  loginValidation,
  registerValidation
};