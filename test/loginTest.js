// let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const loginCredentials = require("../json/testing.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

console.log(" Credentials :: ", loginCredentials);
describe("LOGIN API TEST CASES", () => {
  //Positive test case
  it("it should log successfully", done => {
    chai
      .request(server)
      .post("/login")
      .send(loginCredentials.login[0])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
//.................. Email Test Cases- empty ,null, undefined, invalid email format
  it("it should return email should not be empty", done => {
    chai
      .request(server)
      .post("/login")
      .send(loginCredentials.login[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return email should not be null", done => {
    chai
      .request(server)
      .post("/login")
      .send(loginCredentials.login[2])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return email should not be undefined", done => {
    chai
      .request(server)
      .post("/login")
      .send(loginCredentials.login[3])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return invalid email format", done => {
    chai
      .request(server)
      .post("/login")
      .send(loginCredentials.login[4])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

//.................Password test Cases- empty, null, undefined, minimum 6 characters..........
it("it should return Password should not be empty", done => {
  chai
    .request(server)
    .post("/login")
    .send(loginCredentials.login[5])
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
    });
});

it("it should return Password should not be null", done => {
  chai
    .request(server)
    .post("/login")
    .send(loginCredentials.login[6])
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
    });
});

it("it should return Password should not be undefined", done => {
  chai
    .request(server)
    .post("/login")
    .send(loginCredentials.login[7])
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
    });
});

it("it should return invalid Password,should have minimum 6 characters", done => {
  chai
    .request(server)
    .post("/login")
    .send(loginCredentials.login[8])
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.be.a("object");
      done();
    });
});

//.....................................................................

});
