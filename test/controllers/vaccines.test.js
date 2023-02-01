const chai = require('chai')
const mongoose = require("mongoose");

const expect = chai.expect;
const request = require('supertest')

const app = require('../../app')

const url = '/vaccines';

let token = null;

const vaccineData = {
    _id:"20",
    name: 'Vaccine 1',
    number_of_dose: 2,
    company_email:"something@gmail.com",
    company_contact:"4234234",
    isMandatory: true,
    gender: "Male"
  };

  const updateData = {
    name: 'Vaccine 1',
    number_of_dose: 2,
    company_email:"something@gmail.com",
    company_contact:"24234",
    isMandatory: true,
    gender: "Male",
    _id:"20"
  };

const signinQuery = {
    email:"sushmit.rajaure@gmail.com",
    password:"1234"
}

const vaccineID = "63da285536c9df16c1436c37"

describe('Vaccine API test', () => {
    beforeEach(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/vaccines');
        const res = await request(app).post('/signin').set("Content-Type","application/json").send(signinQuery)
        token = res.body.token
    })

    /* Closing database connection after each test. */
    afterEach(async () => {
    await mongoose.connection.close();
  });


    it('should create new vaccine', async () => {
        const res = await request(app).post(`${url}`).set('Authorization', `${token}`).send(vaccineData);
    
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.an('string');
      });

    it('should not create a new vaccine with empty body', async () => {
    const res = await request(app).post(`${url}`).set('Authorization', `${token}`).send({});

    expect(res.status).to.equal(400);
    
    });

    it('should get all vaccines', async () => {
        const res = await request(app).get(`${url}`).set('Authorization', ` ${token}`);
    
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
      });

      it('should update vaccine', async () => {
        const res = await request(app).patch(`${url}/${vaccineID}`).set('Authorization', ` ${token}`).send(updateData);
        console.log(res.error)
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body.name).to.be.an('string');
      });

      it('should not update vaccine with invalid id', async () => {
        const res = await request(app).put(`${url}/10000`).set('Authorization', `${token}`).send(updateData);
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
      });

      it('should  update mandatory status when isMandatory is null', async () => {
        const res = await request(app)
          .get(`${url}/mandate/${vaccineID}`)
          .set('Authorization', `${token}`)
    
        expect(res.status).to.equal(200);
      });

      it('should not update mandatory status when id is incorrect', async () => {
        const res = await request(app)
          .get(`${url}/mandate/${vaccineID}`)
          .set('Authorization', `${token}`)
    
        expect(res.status).to.equal(200);
      });

      it('should not delete vaccine with incorrect id', async () => {
        const res = await request(app).delete(`${url}/63da27d12fasf93c3ed0ef78e739`).set('Authorization', ` ${token}`);
    
        expect(res.status).to.equal(500);

      });

    

})