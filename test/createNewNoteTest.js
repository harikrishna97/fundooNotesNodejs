const Credentials=require('../json/note.api.testing.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

console.log(' Credentials :: ',Credentials.createNewNote[0]);

  describe('CREATENEWNOTE API TEST CASES', () => {

     it('it should successfully create new note', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[0])
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
                
            done();
          });
    })


    it('it should return email is required', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[1])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return title is required', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[2])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return description cannot be empty', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[3])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return email is required cant be undefined', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[4])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return title is required cant be undefined', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[5])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return description is required cant be undefined', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[6])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return email cant be empty', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[7])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return invalid email format', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[8])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return title cant be null', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[9])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return description cant be null', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[10])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

    it('it should return description cant be null', (done) => {
      chai.request(server)
          .post('/createNewNote')
          .send(Credentials.createNewNote[11])
          .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })




})