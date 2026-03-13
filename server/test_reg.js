import { register } from './src/controllers/authController.js';
import httpMocks from 'node-mocks-http';

const req = httpMocks.createRequest({
    method: 'POST',
    url: '/api/auth/register',
    body: {
        name: 'Test User',
        email: 'test' + Date.now() + '@example.com',
        password: 'password123'
    }
});

const res = httpMocks.createResponse();

console.log('--- Simulating Registration ---');
try {
    await register(req, res);
    console.log('Status Code:', res.statusCode);
    console.log('Response Data:', res._getJSONData());
} catch (e) {
    console.error('Simulation CRASH:', e);
}
process.exit(0);
