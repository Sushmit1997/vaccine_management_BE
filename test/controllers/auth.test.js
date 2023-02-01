const chai = require('chai')
const mongoose = require("mongoose");

const expect = chai.expect;
const request = require('supertest')

const app = require('../../app');

let token = null

//generate random email
const email = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '@gmail.com';

const userData = {
    email: email,
    password: 'test123',
  };


describe('Auth test', () => {

    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/vaccines');
    })

    afterEach(async () => {
        await mongoose.connection.close();
      });

    it('should create a new user', async () => {
        const res = await request(app).post(`/users/signup`).send(userData);

        expect(res.status).to.equal(200);
    })

    it('should not create new user with existing email', async () => {
        const res = await request(app).post(`/users/signup`).send(userData);
    
        expect(res.status).to.equal(400);
      });

      it('should sign in user', async () => {
        const res = await request(app).post(`/signin`).send(userData);
    
        expect(res.status).to.equal(200);
      });

      it('should not sign in user with wrong password', async () => {
        const res = await request(app).post(`/signin`).send({...userData, password: "224234"});
    
        expect(res.status).to.equal(400);
      });
})