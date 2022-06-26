const request = require('supertest')
const app = require('../../../index')
describe('Post Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'john@gmail.com',
        password: 'test',
        name: 'John Doe',
        phone: '456789'
      })
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should return user already exists when using the same email or phone', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'john@gmail.com',
        
        password: 'test',
        name: 'John Doe',
        phone: '456789'
      })
    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('error');
  });

  it('should return error if correct email format is not given', async () => {
    const res = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'johngmail.com',
        password: 'test',
        name: 'John Doe',
        phone: '45678'
      })
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });

  it('should able to login when provided right credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'john@gmail.com',
        password: 'test',
      })
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should return error when given wrong credentials', async () => {
    const res = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'john@gmail.com',
        password: 'tes',
      })
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error');
  });

})