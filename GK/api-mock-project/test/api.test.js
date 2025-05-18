const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;

const BASE_URL = 'http://localhost:3000/api';

describe('API Testing', () => {
    let authToken = '';

    it('Login API - should return token', async () => {
        const res = await axios.post(`${BASE_URL}/login`, {
            username: 'testuser',
            password: '123456'
        });
        expect(res.status).to.equal(200);
        expect(res.data).to.have.property('token');
        authToken = res.data.token;
    });

    it('Get Users API - should return user list', async () => {
        const res = await axios.get(`${BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${authToken}` }
        });
        expect(res.status).to.equal(200);
        expect(res.data).to.be.an('array');
    });
});
