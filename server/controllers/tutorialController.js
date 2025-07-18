const Tutorial = require('../models/Tutorial');

// Get all tutorials
const getAllTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    res.json(tutorials);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tutorials', error: error.message });
  }
};

// Get single tutorial
const getTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);
    
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    
    res.json(tutorial);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    res.status(500).json({ message: 'Error fetching tutorial', error: error.message });
  }
};

// Create tutorial
const createTutorial = async (req, res) => {
  try {
    const { title, category, description, steps, videoUrl } = req.body;
    
    const tutorial = new Tutorial({
      title,
      category,
      description,
      steps,
      videoUrl
    });
    
    const savedTutorial = await tutorial.save();
    res.status(201).json(savedTutorial);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Error creating tutorial', error: error.message });
  }
};

// Update tutorial
const updateTutorial = async (req, res) => {
  try {
    const { title, category, description, steps, videoUrl } = req.body;
    
    const tutorial = await Tutorial.findByIdAndUpdate(
      req.params.id,
      { title, category, description, steps, videoUrl },
      { new: true, runValidators: true }
    );
    
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    
    res.json(tutorial);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: 'Validation error', errors });
    }
    res.status(500).json({ message: 'Error updating tutorial', error: error.message });
  }
};

// Delete tutorial
const deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findByIdAndDelete(req.params.id);
    
    if (!tutorial) {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    
    res.json({ message: 'Tutorial deleted successfully' });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({ message: 'Tutorial not found' });
    }
    res.status(500).json({ message: 'Error deleting tutorial', error: error.message });
  }
};

module.exports = {
  getAllTutorials,
  getTutorial,
  createTutorial,
  updateTutorial,
  deleteTutorial
};