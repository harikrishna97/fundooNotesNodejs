// let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const loginCredentials=require('../json/testing.json')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
    
console.log(' Credentials :: ',loginCredentials);
  describe('FORGET_PASSWORD API TEST CASES', () => {

     //Positive test case
     it('it should return ', (done) => {
      chai.request(server)
          .post('/forgetPassword')
          .send(loginCredentials.forgetPassword[0])
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
            done();
          });
    });



    //   //Negative Test case :: for invalid email
    //   it('it should return Cannot set property "success" of undefined', (done) => {
    //     chai.request(server)
    //         .post('/forgetPassword')
    //         .send(loginCredentials.forgetPassword[1])
    //         .end((err, res) => {
    //               res.should.have.status(422);
    //               res.body.should.be.a('object');
    //               res.body.should.have.property('success').eql(undefined);
    //           done();
    //         });
    //   });

      

       //Negative Test case :: for invalid password
       it('it should return Invalid Password', (done) => {
        chai.request(server)
            .post('/forgetPassword')
            .send(loginCredentials.forgetPassword[2])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
              done();
            });
      });

       //Negative Test case :: for invalid Email/null email
       it('it should return Email cannot be null', (done) => {
        chai.request(server)
            .post('/forgetPassword')
            .send(loginCredentials.forgetPassword[3])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
              done();
            });
      });


      //Negative Test case :: for null Password
      it('it should return Password cannot be null', (done) => {
        chai.request(server)
            .post('/forgetPassword')
            .send(loginCredentials.forgetPassword[4])
            .end((err, res) => {
                  res.should.have.status(422);
                  res.body.should.be.a('object');
              done();
            });
      });


  });
  
