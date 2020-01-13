// let mongoose = require("mongoose");

// let user = require('../app.js/model/user');
const Credentials = require("../json/testing.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

console.log(" Credentials :: ", Credentials);
describe("REGISTRATION API TEST CASES", () => {

  // it("it should return successfully register new user", done => {
  //   chai
  //     .request(server)
  //     .post("/user")
  //     .send(Credentials.registration[0])
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       res.body.should.be.a("object");
  //       done();
  //     });
  // });
//..................... FirstName test Cases ... empty, null, undefined,.........................
  it("it should return firstName should not be empty", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[1])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return firstName should not be null", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[2])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return firstName should not be undefined", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[3])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

//..................... LastName test Cases ... empty, null, undefined,.........................

  it("it should return LastName should not be empty", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[4])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return LastName should not be null", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[5])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return LastName should not be undefined", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[6])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  // .............. Email Test Cases-empty,null,undefined,invalid email format...................................................

  it("it should return email should not be empty", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[7])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return email should not be null", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[8])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return email should not be undefined", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[9])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return Invalid email format", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[10])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  //....................Password Test Case empty, null, undefined, minimum 6 char..............................................
  it("it should return password should not be empty", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[11])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return password should not be null", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[12])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return password should not be undefined", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[13])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should return Invalid password, should have minimum 6 characters", done => {
    chai
      .request(server)
      .post("/user")
      .send(Credentials.registration[14])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        done();
      });
  });
//............................................................................................

});
