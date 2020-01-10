// const Credentials=require('../json/noteTesting.json');
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../server');
// let should =chai.should();

// chai.use(chaiHttp);

// // // console.log(' Credentials :: ',Credentials.createNewNote[0],Credentials.Token[0]);

// // // //CreateNote API Testing
// //   describe('CREATENEWNOTE API TEST CASES', () => {

// //      it('it should successfully create new note', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[0])
// //           .end((err, res) => {
// //                 res.should.have.status(200);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return invalid Token', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[1].token)
// //           .send(Credentials.createNewNote[0])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return invalid Token, token should not be empty', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[2].token)
// //           .send(Credentials.createNewNote[0])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return invalid Token, token should not be null', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[3].token)
// //           .send(Credentials.createNewNote[0])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return invalid Token, token should not be undefined', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           // .set('token',Credentials.Token[4].token)
// //           .send(Credentials.createNewNote[0])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return title is required, should not be empty', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[1])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return description is required, should not be empty', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[2])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return title should not be null', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[3])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })

// //     it('it should return description should not be null', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[4])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     }) 

// //     it('it should return title should not be undefined', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[5])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     })
    
// //     it('it should return description should not be undefined', (done) => {
// //       chai.request(server)
// //           .post('/note')
// //           .set('token',Credentials.Token[0].token)
// //           .send(Credentials.createNewNote[6])
// //           .end((err, res) => {
// //                 res.should.have.status(400);
// //                 res.body.should.be.a('object');
// //                 console.log('Test BOdy :: ',res.body);
// //             done();
// //           });
// //     }) 
// //   })

// //     /**
// //      * @description Getall Notes API TEsting
// //      */

// //     describe('getAllNotes API TEST CASES', () => {

// //       it('it should successfully get all the note', (done) => {
// //        chai.request(server)
// //            .get('/note')
// //            .set('token',Credentials.Token[0].token)
// //           //  .send(Credentials.createNewNote[0])
// //            .end((err, res) => {
// //                  res.should.have.status(200);
// //                  res.body.should.be.a('object');
// //                  console.log('Test BOdy :: ',res.body);
// //              done();
// //            });
// //       })

// //       it('it should return invalid Token', (done) => {
// //         chai.request(server)
// //             .get('/note')
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.createNewNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid Token, token Should not be empty', (done) => {
// //         chai.request(server)
// //             .get('/note')
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.createNewNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid Token, token Should not be null', (done) => {
// //         chai.request(server)
// //             .get('/note')
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.createNewNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid Token, token Should not be undefined', (done) => {
// //         chai.request(server)
// //             .get('/note')
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.createNewNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //     })


// //     /**
// //      * @description editNote API TEsting
// //      */

// //     describe('EditNotes API TEST CASES', () => {

// //       // console.log('noteId',Credentials.noteId[0].noteId)
// //       // console.log('Token',Credentials.Token[0].token)
// //       // console.log('editNote',Credentials.editNote[0]);
      
// //       it('it should successfully edit the note', (done) => {
// //        chai.request(server)
// //            .put('/note/'+Credentials.noteId[0].noteId)
// //            .set('token',Credentials.Token[0].token)
// //            .send(Credentials.editNote[0])
// //            .end((err, res) => {
// //                  res.should.have.status(200);
// //                  res.body.should.be.a('object');
// //                  console.log('Test BOdy :: ',res.body);
// //              done();
// //            });
// //       })

// //       it('it should return Invalid Token', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[1].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return Invalid Token, token should be empty', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[2].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return Invalid Token, token Should Not be null', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[3].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return Invalid Token, token Should Not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             // .set('token',Credentials.Token[4].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })
     
// //       it('it should return Invalid noteId', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[1].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return Invalid noteId,NoteId should not be empty', (done) => {
// //         chai.request(server)
// //             .put('/note/:""')
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return Invalid noteId,NoteId should not be null', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[3].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return title shuold not be empty', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[1])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return title shuold not be null', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[2])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return title should not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[3])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return description should not be empty', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[4])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return title should not be null', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[5])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return description should not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[0].token)
// //             .send(Credentials.editNote[6])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })
    
// //     })


// //     /**
// //      * @description removeNote API TEsting
// //      */

// //     describe('RemoveNote API TEST CASES', () => {

// //       // console.log('noteId',Credentials.noteId[0].noteId)
// //       // console.log('Token',Credentials.Token[0].token)
// //       // console.log('editNote',Credentials.editNote[0]);
      
// //       it('it should successfully remove the note', (done) => {
// //        chai.request(server)
// //            .delete('/note/'+Credentials.noteId[0].noteId)
// //            .set('token',Credentials.Token[0].token)
// //           //  .send(Credentials.removeNote[0])
// //            .end((err, res) => {
// //                  res.should.have.status(200);
// //                  res.body.should.be.a('object');
// //                  console.log('Test BOdy :: ',res.body);
// //              done();
// //            });
// //       })

// //       it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .delete('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return invalid user, token should not be empty', (done) => {
// //         chai.request(server)
// //             .delete('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return invalid token,Token should not be null', (done) => {
// //         chai.request(server)
// //             .delete('/note/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return invalid user, token should not be undefined', (done) => {
// //         chai.request(server)
// //             .delete('/note/'+Credentials.noteId[0].noteId)
// //             // .set('token',Credentials.Token[4].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return invalid noteId', (done) => {
// //         chai.request(server)
// //             .delete('/note/'+Credentials.noteId[1].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return invalid noteId, noteId should not be empty', (done) => {
// //         chai.request(server)
// //             .delete('/note/:""')
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //       it('it should return invalid noteId, NoteId should not be undefined', (done) => {
// //         chai.request(server)
// //             .delete('/note/:noteId')
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.removeNote[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })


// //     })
// //     /**
// //      * @description Getall Notes API TEsting
// //      */

// //     describe('getAllNotes API TEST CASES', () => {

// //       it('it should successfully get all the note', (done) => {
// //        chai.request(server)
// //            .get('/note')
// //            .set('token',Credentials.Token[0].token)
// //           //  .send(Credentials.createNewNote[0])
// //            .end((err, res) => {
// //                  res.should.have.status(200);
// //                  res.body.should.be.a('object');
// //                  console.log('Test BOdy :: ',res.body);
// //              done();
// //            });
// //       })

// //     })

// //     /**
// //      * @description ADD Remainder API TEsting
// //     */
// //     describe('Add Remainder API TEST CASES', () => {

// //         it('it should successfully add remainder to the note', (done) => {
// //          chai.request(server)
// //              .post('/remainder/'+Credentials.noteId[0].noteId)
// //              .set('token',Credentials.Token[0].token)
// //              .send(Credentials.addRemainder[0])
// //              .end((err, res) => {
// //                    res.should.have.status(200);
// //                    res.body.should.be.a('object');
// //                    console.log('Test BOdy :: ',res.body);
// //                done();
// //              });
// //         })

// //         it('it should return invalid NoteId', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[1].noteId)
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })  
        
// //         it('it should return invalid NoteId,NoteId should not be empty', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/""')
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })  

// //         it('it should return invalid NoteId,NoteId should not be null', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[3].noteId)
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         }) 
        
// //         it('it should return invalid NoteId,NoteId should not be undefined', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[4].noteId)
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })

// //         it('it should return invalid token', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 .set('token',Credentials.Token[1].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         }) 

// //         it('it should return invalid token,Token should not be empty', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 .set('token',Credentials.Token[2].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })

// //         it('it should return invalid token,Token should not be null', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 .set('token',Credentials.Token[3].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })

// //         it('it should return invalid token,Token should not be undefined', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 // .set('token',Credentials.Token[4].token)
// //                 .send(Credentials.addRemainder[0])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })

// //         it('it should return reminder should not be empty', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[1])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })

// //         it('it should return reminder should not be null', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[2])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })

// //         it('it should return reminder should not be undefined', (done) => {
// //             chai.request(server)
// //                 .post('/remainder/'+Credentials.noteId[0].noteId)
// //                 .set('token',Credentials.Token[0].token)
// //                 .send(Credentials.addRemainder[3])
// //                 .end((err, res) => {
// //                       res.should.have.status(400);
// //                       res.body.should.be.a('object');
// //                       console.log('Test BOdy :: ',res.body);
// //                   done();
// //                 });
// //         })
        
// //     })


// //     /**
// //      * @description Remove Remainder API TEsting
// //     */
// //    describe('Add Remainder API TEST CASES', () => {

// //     it('it should successfully remove remainder from the note', (done) => {
// //      chai.request(server)
// //          .delete('/remainder/'+Credentials.noteId[0].noteId)
// //          .set('token',Credentials.Token[0].token)
// //         //  .send(Credentials.addRemainder[0])
// //          .end((err, res) => {
// //                res.should.have.status(200);
// //                res.body.should.be.a('object');
// //                console.log('Test BOdy :: ',res.body);
// //            done();
// //          });
// //     })

// //     it('it should return invalid noteId', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/'+Credentials.noteId[1].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid noteId,NoteId should not be empty', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/:""')
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid noteId,NoteId should not be null', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/'+Credentials.noteId[3].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid noteId,NoteId should not be undefined', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/'+Credentials.noteId[4].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })


// //     it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token, Token should not be empty', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token, Token should not be undefined', (done) => {
// //         chai.request(server)
// //             .delete('/remainder/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })
// //    })
// //     /**
// //      * @description Get All Archive Notes API TEsting
// //     */
// //    describe('Get All Archive Notes API TEST CASES', () => {

// //     it('it should successfully get all archive notes', (done) => {
// //      chai.request(server)
// //          .get('/archive')
// //          .set('token',Credentials.Token[0].token)
// //         //  .send(Credentials.addRemainder[0])
// //          .end((err, res) => {
// //                res.should.have.status(200);
// //                res.body.should.be.a('object');
// //                console.log('Test BOdy :: ',res.body);
// //            done();
// //          });
// //     })

// //     it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .get('/archive')
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //     it('it should return invalid user,token should not be empty', (done) => {
// //         chai.request(server)
// //             .get('/archive')
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid token,token should not be null', (done) => {
// //         chai.request(server)
// //             .get('/archive')
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid token,token should not be undefined', (done) => {
// //         chai.request(server)
// //             .get('/archive')
// //             // .set('token',Credentials.Token[4].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //    })


// //     /**
// //      * @description Get All Archive Notes API TEsting
// //     */
// //    describe('Get All trash Notes API TEST CASES', () => {

// //     it('it should successfully get all archive notes', (done) => {
// //      chai.request(server)
// //          .get('/trash')
// //          .set('token',Credentials.Token[0].token)
// //         //  .send(Credentials.addRemainder[0])
// //          .end((err, res) => {
// //                res.should.have.status(200);
// //                res.body.should.be.a('object');
// //                console.log('Test BOdy :: ',res.body);
// //            done();
// //          });
// //     })

// //     it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .get('/trash')
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //     it('it should return invalid user,token should not be empty', (done) => {
// //         chai.request(server)
// //             .get('/trash')
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid token,token should not be null', (done) => {
// //         chai.request(server)
// //             .get('/trash')
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid token,token should not be undefined', (done) => {
// //         chai.request(server)
// //             .get('/trash')
// //             // .set('token',Credentials.Token[4].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //    })

// //    /**
// //      * @description Get All Archive Notes API TEsting
// //     */
// //    describe('Get All pin Notes API TEST CASES', () => {

// //     it('it should successfully get all pin notes', (done) => {
// //      chai.request(server)
// //          .get('/pin')
// //          .set('token',Credentials.Token[0].token)
// //         //  .send(Credentials.addRemainder[0])
// //          .end((err, res) => {
// //                res.should.have.status(200);
// //                res.body.should.be.a('object');
// //                console.log('Test BOdy :: ',res.body);
// //            done();
// //          });
// //     })

// //     it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .get('/pin')
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //     it('it should return invalid user,token should not be empty', (done) => {
// //         chai.request(server)
// //             .get('/pin')
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid token,token should not be null', (done) => {
// //         chai.request(server)
// //             .get('/pin')
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //        it('it should return invalid token,token should not be undefined', (done) => {
// //         chai.request(server)
// //             .get('/pin')
// //             // .set('token',Credentials.Token[4].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //        })

// //    })



// // /**
// //      * @description  Archive given NoteAPI TEsting
// //     */
// //    describe(' archive Note API TEST CASES', () => {

// //     it('it should successfully archive given Note', (done) => {
// //      chai.request(server)
// //          .put('/archive/'+Credentials.noteId[0].noteId)
// //          .set('token',Credentials.Token[0].token)
// //         //  .send(Credentials.addRemainder[0])
// //          .end((err, res) => {
// //                res.should.have.status(200);
// //                res.body.should.be.a('object');
// //                console.log('Test BOdy :: ',res.body);
// //            done();
// //          });
// //     })

// //     it('it should return invalid NoteId', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[1].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid NoteId,NoteId should not be empty', (done) => {
// //         chai.request(server)
// //             .put('/archive/:""')
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })


// //     it('it should return invalid NoteId,NoteId should not be null', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[3].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid NoteId,NoteId should not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[4].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token,token should not empty', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token,token should not be null', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token,token should not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/archive/'+Credentials.noteId[0].noteId)
// //             // .set('token',Credentials.Token[4].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })
// // })

// //     /**
// //      * @description  pinned given NoteAPI TEsting
// //     */
// //    describe(' pinned Note API TEST CASES', () => {

// //     it('it should successfully archive given Note', (done) => {
// //      chai.request(server)
// //          .put('/pin/'+Credentials.noteId[0].noteId)
// //          .set('token',Credentials.Token[0].token)
// //         //  .send(Credentials.addRemainder[0])
// //          .end((err, res) => {
// //                res.should.have.status(200);
// //                res.body.should.be.a('object');
// //                console.log('Test BOdy :: ',res.body);
// //            done();
// //          });
// //     })

// //     it('it should return invalid NoteId', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[1].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid NoteId,NoteId should not be empty', (done) => {
// //         chai.request(server)
// //             .put('/pin/:""')
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })


// //     it('it should return invalid NoteId,NoteId should not be null', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[3].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid NoteId,NoteId should not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[4].noteId)
// //             .set('token',Credentials.Token[0].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[1].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token,token should not empty', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[2].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token,token should not be null', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[0].noteId)
// //             .set('token',Credentials.Token[3].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })

// //     it('it should return invalid token,token should not be undefined', (done) => {
// //         chai.request(server)
// //             .put('/pin/'+Credentials.noteId[0].noteId)
// //             // .set('token',Credentials.Token[4].token)
// //            //  .send(Credentials.addRemainder[0])
// //             .end((err, res) => {
// //                   res.should.have.status(400);
// //                   res.body.should.be.a('object');
// //                   console.log('Test BOdy :: ',res.body);
// //               done();
// //             });
// //     })
// // })




// //.......................................................................

//     /**
//      * @description  SearchNote API Testing
//     */
//    describe(' search Note API TEST CASES', () => {

//     it('it should successfully search given Note', (done) => {
//       const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTBlZTMzZjY5M2E4ZDI0ZWZhYmE4YmEiLCJlbWFpbCI6ImFkaG9rc2hhajEwOEBnbWFpbC5jb20iLCJpYXQiOjE1Nzg1NjY5NDgsImV4cCI6MTU3ODY1MzM0OH0.SYp64oNjw6ZUODfcohJ3RMMDkynuGOcfCazXjPuhZoM";

//      chai.request(server)
//          .get('/search/"red"')
//          .set('token',token)
//           .send()
//          .end((err, res) => {
//                res.should.have.status(200);
//               //  res.body.should.be.a('object');
//                console.log('Test BOdy :: ',err);
//            done();
//          });
//     })

//   })