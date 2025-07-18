const express = require('express');
const router = express.Router();
const {
  getAllTutorials,
  getTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial
} = require('../controllers/tutorialController');
const authMiddleware = require('../middleware/auth');
const { tutorialValidation, validate } = require('../middleware/validation');

// Public routes
router.get('/', getAllTutorials);
router.get('/:id', getTutorial);

// Protected routes (admin only)
router.post('/', authMiddleware, tutorialValidation, validate, createTutorial);
router.put('/:id', authMiddleware, tutorialValidation, validate, updateTutorial);
router.delete('/:id', authMiddleware, deleteTutorial);

module.exports = router;