const Credentials=require('../json/note.api.testing.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

console.log(' Credentials :: ',Credentials.removeNote[0]);

  describe('RemoveNote API TEST CASES', () => {

     it('it should successfully delete note', (done) => {
      chai.request(server)
          .post('/removeNote')
          .send(Credentials.removeNote[0])
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
                
            done();
          });
    })

    it('it should return NoteId Should not be empty', (done) => {
        chai.request(server)
            .post('/removeNote')
            .send(Credentials.removeNote[1])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
                  
              done();
            });
      })

      it('it should return NoteId Should not be null', (done) => {
        chai.request(server)
            .post('/removeNote')
            .send(Credentials.removeNote[2])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
                  
              done();
            });
      })

      it('it should return NoteId Should is required /cant be undefined', (done) => {
        chai.request(server)
            .post('/removeNote')
            .send(Credentials.removeNote[3])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
                  
              done();
            });
      })

      it('it should return  Invalid NoteId ', (done) => {
        chai.request(server)
            .post('/removeNote')
            .send(Credentials.removeNote[4])
            .end((err, res) => {
                  res.should.have.status(400);
                  res.body.should.be.a('object');
                  console.log('Test BOdy :: ',res.body);
                  
              done();
            });
      })
})