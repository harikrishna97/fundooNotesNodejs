// let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const Credentials=require('../json/testing.json')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
    
console.log(' Credentials :: ',Credentials);
  describe('REGISTRATION API TEST CASES', () => {

     //negative test case
     it('it should return fisrtName is required', (done) => {
      chai.request(server)
          .post('/registration')
          .send(Credentials.registration[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return email cannot be null', (done) => {
        chai.request(server)
            .post('/registration')
            .send(Credentials.registration[1])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
              done();
            });
      })

      it('it should return Password cannot be null', (done) => {
        chai.request(server)
            .post('/registration')
            .send(Credentials.registration[2])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
              done();
            });
      })


      //negative test case
     it('it should return lastName is required', (done) => {
        chai.request(server)
            .post('/registration')
            .send(Credentials.registration[3])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
              done();
            });
      })

})
