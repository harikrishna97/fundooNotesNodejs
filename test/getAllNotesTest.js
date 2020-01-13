const Credentials=require('../json/noteTesting.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should =chai.should();

chai.use(chaiHttp);    
    
    
    /**
     * @description Getall Notes API TEsting
     */

    describe('getAllNotes API TEST CASES', () => {
console.log('Credentials.Token[0].token',Credentials.Token[0].token);

      it('it should successfully get all the note', (done) => {
       chai.request(server)
           .get('/note')
           .set('token',Credentials.Token[0].token)
          //  .send(Credentials.createNewNote[0])
           .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 console.log('Test BOdy :: ',res.body);
             done();
           });
      })

      it('it should return invalid Token', (done) => {
        chai.request(server)
            .get('/note')
            .set('token',Credentials.Token[1].token)
           //  .send(Credentials.createNewNote[0])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
              done();
            });
       })

       it('it should return invalid Token, token Should not be empty', (done) => {
        chai.request(server)
            .get('/note')
            .set('token',Credentials.Token[2].token)
           //  .send(Credentials.createNewNote[0])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
              done();
            });
       })

       it('it should return invalid Token, token Should not be null', (done) => {
        chai.request(server)
            .get('/note')
            .set('token',Credentials.Token[3].token)
           //  .send(Credentials.createNewNote[0])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
              done();
            });
       })

       it('it should return invalid Token, token Should not be undefined', (done) => {
        chai.request(server)
            .get('/note')
            .set('token',Credentials.Token[2].token)
           //  .send(Credentials.createNewNote[0])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
              done();
            });
       })

    })

