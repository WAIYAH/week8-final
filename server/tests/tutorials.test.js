const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Tutorial = require('../models/Tutorial');

describe('Tutorial API', () => {
  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/firstaidguru_test';
    await mongoose.connect(mongoUri);
  });

  beforeEach(async () => {
    // Clear tutorials before each test
    await Tutorial.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /api/tutorials', () => {
    it('should return empty array when no tutorials exist', async () => {
      const response = await request(app)
        .get('/api/tutorials')
        .expect(200);

      expect(response.body).toEqual([]);
    });

    it('should return all tutorials', async () => {
      // Create test tutorial
      const tutorial = new Tutorial({
        title: 'Test Tutorial',
        category: 'bleeding',
        description: 'Test description',
        steps: ['Step 1', 'Step 2']
      });
      await tutorial.save();

      const response = await request(app)
        .get('/api/tutorials')
        .expect(200);

      expect(response.body).toHaveLength(1);
      expect(response.body[0].title).toBe('Test Tutorial');
    });
  });

  describe('GET /api/tutorials/:id', () => {
    it('should return a specific tutorial', async () => {
      const tutorial = new Tutorial({
        title: 'Test Tutorial',
        category: 'bleeding',
        description: 'Test description',
        steps: ['Step 1', 'Step 2']
      });
      await tutorial.save();

      const response = await request(app)
        .get(`/api/tutorials/${tutorial._id}`)
        .expect(200);

      expect(response.body.title).toBe('Test Tutorial');
    });

    it('should return 404 for non-existent tutorial', async () => {
      const fakeId = new mongoose.Types.ObjectId();
      
      await request(app)
        .get(`/api/tutorials/${fakeId}`)
        .expect(404);
    });
  });
});