const Credentials = require("../json/noteTesting.json");
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

console.log(" Credentials :: ", Credentials);

/**
 * @description editNote API TEsting
 */

describe("EditNotes API TEST CASES", () => {
  // console.log('noteId',Credentials.noteId[0].noteId)
  // console.log('Token',Credentials.Token[0].token)
  // console.log('editNote',Credentials.editNote[0]);

  it("it should successfully update the note", done => {
    chai
      .request(server)
      .put("/note/" + Credentials.noteId[0].noteId)
      .set("token", Credentials.Token[0].token)
      .send(Credentials.editNote[0])
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        console.log("Test BOdy :: ", res.body);
        done();
      });
  });
});

//       it('it should return Invalid Token', (done) => {
//         chai.request(server)
//             .put('/note/'+Credentials.noteId[0].noteId)
//             .set('token',Credentials.Token[1].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       it('it should return Invalid Token, token should be empty', (done) => {
//         chai.request(server)
//             .put('/note/'+Credentials.noteId[0].noteId)
//             .set('token',Credentials.Token[2].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       it('it should return Invalid Token, token Should Not be null', (done) => {
//         chai.request(server)
//             .put('/note/'+Credentials.noteId[0].noteId)
//             .set('token',Credentials.Token[3].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       it('it should return Invalid Token, token Should Not be undefined', (done) => {
//         chai.request(server)
//             .put('/note/'+Credentials.noteId[0].noteId)
//             // .set('token',Credentials.Token[4].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       it('it should return Invalid noteId', (done) => {
//         chai.request(server)
//             .put('/note/'+Credentials.noteId[1].noteId)
//             .set('token',Credentials.Token[0].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       it('it should return Invalid noteId,NoteId should not be empty', (done) => {
//         chai.request(server)
//             .put('/note/:""')
//             .set('token',Credentials.Token[0].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       it('it should return Invalid noteId,NoteId should not be null', (done) => {
//         chai.request(server)
//             .put('/note/'+Credentials.noteId[3].noteId)
//             .set('token',Credentials.Token[0].token)
//             .send(Credentials.editNote[0])
//             .end((err, res) => {
//                   res.should.have.status(400);
//                   res.body.should.be.a('object');
//                   console.log('Test BOdy :: ',res.body);
//               done();
//             });
//        })

//       // it('it should return title shuold not be empty', (done) => {
//       //   chai.request(server)
//       //       .put('/note/'+Credentials.noteId[0].noteId)
//       //       .set('token',Credentials.Token[0].token)
//       //       .send(Credentials.editNote[1])
//       //       .end((err, res) => {
//       //             res.should.have.status(400);
//       //             res.body.should.be.a('object');
//       //             console.log('Test BOdy :: ',res.body);
//       //         done();
//       //       });
//       //  })

//       // it('it should return title shuold not be null', (done) => {
//       //   chai.request(server)
//       //       .put('/note/'+Credentials.noteId[0].noteId)
//       //       .set('token',Credentials.Token[0].token)
//       //       .send(Credentials.editNote[2])
//       //       .end((err, res) => {
//       //             res.should.have.status(400);
//       //             res.body.should.be.a('object');
//       //             console.log('Test BOdy :: ',res.body);
//       //         done();
//       //       });
//       //  })

//       // it('it should return title should not be undefined', (done) => {
//       //   chai.request(server)
//       //       .put('/note/'+Credentials.noteId[0].noteId)
//       //       .set('token',Credentials.Token[0].token)
//       //       .send(Credentials.editNote[3])
//       //       .end((err, res) => {
//       //             res.should.have.status(400);
//       //             res.body.should.be.a('object');
//       //             console.log('Test BOdy :: ',res.body);
//       //         done();
//       //       });
//       //  })

//       // it('it should return description should not be empty', (done) => {
//       //   chai.request(server)
//       //       .put('/note/'+Credentials.noteId[0].noteId)
//       //       .set('token',Credentials.Token[0].token)
//       //       .send(Credentials.editNote[4])
//       //       .end((err, res) => {
//       //             res.should.have.status(400);
//       //             res.body.should.be.a('object');
//       //             console.log('Test BOdy :: ',res.body);
//       //         done();
//       //       });
//       //  })

//       // it('it should return title should not be null', (done) => {
//       //   chai.request(server)
//       //       .put('/note/'+Credentials.noteId[0].noteId)
//       //       .set('token',Credentials.Token[0].token)
//       //       .send(Credentials.editNote[5])
//       //       .end((err, res) => {
//       //             res.should.have.status(400);
//       //             res.body.should.be.a('object');
//       //             console.log('Test BOdy :: ',res.body);
//       //         done();
//       //       });
//       //  })

//       // it('it should return description should not be undefined', (done) => {
//       //   chai.request(server)
//       //       .put('/note/'+Credentials.noteId[0].noteId)
//       //       .set('token',Credentials.Token[0].token)
//       //       .send(Credentials.editNote[6])
//       //       .end((err, res) => {
//       //             res.should.have.status(400);
//       //             res.body.should.be.a('object');
//       //             console.log('Test BOdy :: ',res.body);
//       //         done();
//       //       });
//       //  })

//     })
