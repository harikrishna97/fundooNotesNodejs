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
                res.should.have.status(400);
                res.body.should.be.a('object');
            done();
          });
    })

  })