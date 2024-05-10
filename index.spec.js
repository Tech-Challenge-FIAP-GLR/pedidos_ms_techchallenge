const supertest = require('supertest');
const mongoose = require('mongoose');
const express = require('express');
const app = require('./index.js'); // Assuming your file is named 'app.js'
const { expect } = require('jest');

const request = supertest(app); // Create a request agent using supertest

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Test the express app endpoints', () => {
  it('should return 200 status for GET /api-docs', async () => {
    const response = await request.get('/api-docs');
    expect(response.status).toBe(200);
  });

  it('should return 404 status for non-existing route', async () => {
    const response = await request.get('/non-existing-route');
    expect(response.status).toBe(404);
  });

  // Add more test cases for other routes if necessary
});