// let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const loginCredentials = require("../json/testing.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

console.log(" Credentials :: ", loginCredentials);
describe("FORGET_PASSWORD API TEST CASES", () => {
  //Positive test case
  // it("it should return successfully pass the test ", done => {
  //   chai
  //     .request(server)
  //     .post("/forgetPassword")
  //     .send(loginCredentials.forgetPassword[0])
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a("object");
  //       done();
  //     });
  // });

  //..................Email Test Cases empty,null,undefined , invalid email format.....................
  it("it should return email should not be empty ", done => {
    chai
      .request(server)
      .post("/forgetPassword")
      .send(loginCredentials.forgetPassword[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return email should not be null ", done => {
    chai
      .request(server)
      .post("/forgetPassword")
      .send(loginCredentials.forgetPassword[2])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should return email should not be undefined ", done => {
    chai
      .request(server)
      .post("/forgetPassword")
      .send(loginCredentials.forgetPassword[3])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
  it("it should return invalid email format ", done => {
    chai
      .request(server)
      .post("/forgetPassword")
      .send(loginCredentials.forgetPassword[4])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  //.......................................................................................
});
