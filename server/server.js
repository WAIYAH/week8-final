const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const tutorialRoutes = require('./routes/tutorials');
const authRoutes = require('./routes/auth');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tutorials', tutorialRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'FirstAidGuru API is running' });
});

// Socket.io for real-time features
const tutorialViewers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-tutorial', (tutorialId) => {
    socket.join(tutorialId);
    
    if (!tutorialViewers.has(tutorialId)) {
      tutorialViewers.set(tutorialId, new Set());
    }
    
    tutorialViewers.get(tutorialId).add(socket.id);
    
    // Emit updated viewer count to all users in the tutorial room
    const viewerCount = tutorialViewers.get(tutorialId).size;
    io.to(tutorialId).emit('viewer-count', viewerCount);
  });

  socket.on('leave-tutorial', (tutorialId) => {
    socket.leave(tutorialId);
    
    if (tutorialViewers.has(tutorialId)) {
      tutorialViewers.get(tutorialId).delete(socket.id);
      
      const viewerCount = tutorialViewers.get(tutorialId).size;
      io.to(tutorialId).emit('viewer-count', viewerCount);
      
      if (viewerCount === 0) {
        tutorialViewers.delete(tutorialId);
      }
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove user from all tutorial rooms
    tutorialViewers.forEach((viewers, tutorialId) => {
      if (viewers.has(socket.id)) {
        viewers.delete(socket.id);
        const viewerCount = viewers.size;
        io.to(tutorialId).emit('viewer-count', viewerCount);
        
        if (viewerCount === 0) {
          tutorialViewers.delete(tutorialId);
        }
      }
    });
  });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/firstaidguru')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});