/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
  id:"d03301da-2b61-11ec-8d3d-0242ac130003"
};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
  describe('GET /dogs', () => {
    it('content type should be json', () =>
      agent.get('/dogs').expect('Content-Type', /json/)
    );
  });
  describe('GET /dogs/:id', () => {
    it('should get right dog by id', () =>
      agent.get('/dogs/d03301da-2b61-11ec-8d3d-0242ac130003').expect(function(res){
        expect(res.body.name).to.eql("Pug")
      })
    );
  });
});
