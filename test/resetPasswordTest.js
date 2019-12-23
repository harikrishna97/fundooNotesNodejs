let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const Credentials=require('./testing.json')
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
    
console.log(' Credentials :: ',Credentials);
  describe('RESET PASSWORD API TEST CASES', () => {

     //Positive test case
     it('it should reset successfully', (done) => {
      chai.request(server)
          .post('/resetPassword')
          .set('token',Credentials.resetWithToken[0])
          .send(Credentials.resetPassword[0])
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');       
            done();
           
          });
    })


    // it('it should return password cannot be null/invalid password', (done) => {
    //     chai.request(server)
    //         .post('/resetPassword')
    //         .send(Credentials.resetPassword[1])
    //         .end((err, res) => {
    //               res.should.have.status(200);
    //               res.body.should.be.a('object');
    //               res.body.should.have.property('error');
                  
    //           done();
             
    //         });
    //   })

})
