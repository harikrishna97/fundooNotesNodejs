// let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const Credentials = require("../json/testing.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

console.log(' Credentials :: ',Credentials);
describe("RESET PASSWORD API TEST CASES", () => {
  //Positive test case
  it("it should reset successfully", done => {
    chai
      .request(server)
      .post("/resetPassword")
      .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBlZTMzZjY5M2E4ZDI0ZWZhYmE4YmEiLCJlbWFpbCI6ImFkaG9rc2hhajEwOEBnbWFpbC5jb20iLCJpYXQiOjE1Nzg5MDgwMTEsImV4cCI6MTU4NDA5MjAxMX0.rDshzRd36Fp51xbvxv9voitCGUTYhoXUnoDakaQYYpg")
      .send({"password":"adhokshaj123"})
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
        console.log("Response in reset test", res.body);
      });
  });
//.................Password TEst Cases-empty , null, undefined, minimum 6 char.........................
it("it should return password should not be empty", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[0].token)
    .send(Credentials.resetPassword[1].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});


it("it should return password should not be null", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[0].token)
    .send(Credentials.resetPassword[2].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});

it("it should return password should not be undefined", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[0].token)
    .send(Credentials.resetPassword[3].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});

it("it should return password should have minimum 6 character", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[0].token)
    .send(Credentials.resetPassword[4].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});

//............Token TEst Cases-empty , null, undefined, invalid....................

// console.log('Credentials.resetWithToken[1].token',Credentials.resetWithToken[1].token);

it("it should return Token should not be empty", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[1].token)
    .send(Credentials.resetPassword[0].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});


it("it should return Token should not be null", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[2].token)
    .send(Credentials.resetPassword[0].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});

it("it should return Token should not be undefined", done => {
  chai
    .request(server)
    .post("/resetPassword")
    // .set("token", Credentials.resetWithToken[3].token)
    .send(Credentials.resetPassword[0].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});

it("it should return invalid Token", done => {
  chai
    .request(server)
    .post("/resetPassword")
    .set("token", Credentials.resetWithToken[4].token)
    .send(Credentials.resetPassword[0].password)
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
      console.log("Response in reset test", res.body);
    });
});
//......................................................................................
});
