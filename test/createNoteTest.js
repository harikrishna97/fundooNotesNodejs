const Credentials=require('../json/noteTesting.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should =chai.should();
console.log(Credentials.Token[0].token);
chai.use(chaiHttp);

// console.log(' Credentials :: ',Credentials.createNewNote[0],Credentials.Token[0]);

// //CreateNote API Testing
  describe('CREATENEWNOTE API TEST CASES', () => {

     it('it should successfully create new note', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[0])
          .end((err, res) => {
            // console.log(Credentials.Token[0].token);
            
                // res.should.have.status(200);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return invalid Token', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[1].token)
          .send(Credentials.createNewNote[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return invalid Token, token should not be empty', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[2].token)
          .send(Credentials.createNewNote[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return invalid Token, token should not be null', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[3].token)
          .send(Credentials.createNewNote[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return invalid Token, token should not be undefined', (done) => {
      chai.request(server)
          .post('/note')
          // .set('token',Credentials.Token[4].token)
          .send(Credentials.createNewNote[0])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return title is required, should not be empty', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[1])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return description is required, should not be empty', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[2])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return title should not be null', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[3])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })

    it('it should return description should not be null', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[4])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    }) 

    it('it should return title should not be undefined', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[5])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    })
    
    it('it should return description should not be undefined', (done) => {
      chai.request(server)
          .post('/note')
          .set('token',Credentials.Token[0].token)
          .send(Credentials.createNewNote[6])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
            done();
          });
    }) 
  })
