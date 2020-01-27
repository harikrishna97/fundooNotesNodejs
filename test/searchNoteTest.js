const Credentials = require("../json/noteTesting.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();
const logger=require('../config/winston')

chai.use(chaiHttp);

logger.info(" Credentials :: ", Credentials);

/**
 * @description searchNote API TEsting
 */

describe("searchNote API TEST CASES", () => {
  // logger.info('noteId',Credentials.noteId[0].noteId)
  logger.info('Token',Credentials.Token[0].token)
  // logger.info('editNote',Credentials.editNote[0]);
  //.................Search using title..................
  it("it should successfully search using title the note", done => {
    chai
      .request(server)
      .get("/search/" +"myNote1")
      .set("token", Credentials.Token[0].token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });
  //............... Search using descriiption ..................
  it("it should successfully search using description the note", done => {
    chai
      .request(server)
      .get("/search/" + "learning")
      .set("token", Credentials.Token[0].token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });
  //............. Search using Any alphabet present in a note ...................
  it("it should successfully search using any alphabet present in the note", done => {
    chai
      .request(server)
      .get("/search/"+"a")
      .set("token", Credentials.Token[0].token)
      .send()
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });

  //............. Token test Cases-empty,null,undefined,invalid token ...................
  it("it should return token should not be empty", done => {
    chai
      .request(server)
      .get("/search/" + "a")
      .set("token", Credentials.Token[1].token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });

  it("it should return token should not be null", done => {
    chai
      .request(server)
      .get("/search/" + "a")
      .set("token", Credentials.Token[2].token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });

  it("it should return token should not be undefined", done => {
    chai
      .request(server)
      .get("/search/" + "a")
    //   .set("token", Credentials.Token[2].token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });

  it("it should return invalid token", done => {
    chai
      .request(server)
      .get("/search/" + "a")
      .set("token", "2323drsdsfhjajf.kljdkjhfjdf.;kfjdjfl")
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });

  it("it should return search key is required", done => {
    chai
      .request(server)
      .get("/search/"+{})
      .set("token", Credentials.Token[0].token)
      .send()
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        logger.info("Test BOdy :: ", res.body);
        done();
      });
  });
});
