const express = require('express');
const router = express.Router();
const { loginAdmin, createAdmin } = require('../controllers/authController');
const { loginValidation, registerValidation, validate } = require('../middleware/validation');

// Login route
router.post('/login', loginValidation, validate, loginAdmin);

// Register route (for initial admin setup)
router.post('/register', registerValidation, validate, createAdmin);

module.exports = router;