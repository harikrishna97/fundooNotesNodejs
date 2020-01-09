//     /**
//      * @description  add collborator TEsting
//     */
//    describe(' addCollaborator API TEST CASES', () => {

//     it('it should successfully add collaborator to the given note', (done) => {
//      chai.request(server)
//          .put('/pin/'+Credentials.noteId[0].noteId)
//          .set('token',Credentials.Token[0].token)
//          .send(Credentials.addRemainder[0])
//          .end((err, res) => {
//                res.should.have.status(200);
//                res.body.should.be.a('object');
//                console.log('Test BOdy :: ',res.body);
//            done();
//          });
//     })
// })