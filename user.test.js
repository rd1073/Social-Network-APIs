const request = require('supertest');
const app = require('./server'); // Your Express app

describe('POST /auth/register', () => {
  it('should register a new user', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'testpassword',
        bio: 'Test user bio',
      });
    
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
    expect(res.body).toHaveProperty('username', 'testuser');
    // Add more assertions as needed
  });

  it('should return 400 for invalid registration data', async () => {
    const res = await request(server)
      .post('/auth/register')
      .send({
        // Invalid data (missing required fields)
      });

    expect(res.status).toBe(400);
    // Add more assertions for error responses
  });
});
