const Credentials=require('../json/note.api.testing.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

console.log(' Credentials :: ',Credentials.editNote[0]);

  describe('EditNote API TEST CASES', () => {

     it('it should successfully Update/Edit note', (done) => {
      chai.request(server)
          .post('/editNote')
          .send(Credentials.editNote[0])
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
                
            done();
          });
    })
    
    it('it should return NoteId cant be empty', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[1])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return NoteId cant be null', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[2])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return NoteId cant be undefined', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[3])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return title cant be empty', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[4])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return title cant be null', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[5])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return title cant be undefined', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[6])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return description cant be empty', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[7])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return description cant be null', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[8])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

      it('it should return description cant be undefined', (done) => {
        chai.request(server)
            .post('/editNote')
            .send(Credentials.editNote[9])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);

              done();
            });
      })

  })