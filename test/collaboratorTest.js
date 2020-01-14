const Credentials = require("../json/noteTesting.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
logger = require("../config/winston");
// logger.info(Credentials.Token[0].token);
chai.use(chaiHttp);

/**
 * @description  add collborator TEsting
 */
describe(" addCollaborator API TEST CASES", () => {
  it("it should successfully add collaborator to the given note", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[0].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });
  //..............CollaboratorI test cases -empty,null,undefined,invalid.........................
  it("it should return invalid collaboratorId ", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[1].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return collaboratorId should not be empty", done => {
    chai
      .request(server)
      .post("/collaborator/" + Credentials.noteId[0].noteId + "/''")
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return collaboratorId should not be null", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[3].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return collaboratorId should not be undefined", done => {
    chai
      .request(server)
      .post("/collaborator/" + Credentials.noteId[0].noteId + "/" + {})
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });
  //................Token Test empty,null,invalid,undefined.................
  it("it should return invalid token", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[3].collaboratorId
      )
      .set("token", Credentials.Token[1].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return token should not be empty", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[3].collaboratorId
      )
      .set("token", Credentials.Token[2].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return token should not be null", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[3].collaboratorId
      )
      .set("token", Credentials.Token[3].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return token should not be undefined", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[0].noteId +
          "/" +
          Credentials.collaboratorId[3].collaboratorId
      )
      //   .set("token", Credentials.Token[3].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  //.............NoteId Test cases - empty,null,undefined,invalid..................

  it("it should return invalid noteId ", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[1].noteId +
          "/" +
          Credentials.collaboratorId[0].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return noteId should not be empty", done => {
    chai
      .request(server)
      .post(
        "/collaborator/''" + "/" + Credentials.collaboratorId[0].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return noteId should not be null", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          Credentials.noteId[3].noteId +
          "/" +
          Credentials.collaboratorId[0].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });

  it("it should return noteId should not be undefined", done => {
    chai
      .request(server)
      .post(
        "/collaborator/" +
          {} +
          "/" +
          Credentials.collaboratorId[0].collaboratorId
      )
      .set("token", Credentials.Token[0].token)
      // .send(Credentials.addRemainder[0])
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: " + res.body);
        done();
      });
  });
});
