const Credentials=require('../json/note.api.testing.json');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

console.log(' Credentials :: ',Credentials.getAllNotes[0]);

  describe('GetAllNotes API TEST CASES', () => {

     it('it should return All Notes', (done) => {
      chai.request(server)
          .get('/note/:userId')
          .set('userId',getAllNotes[0])
          .send()
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                console.log('Test BOdy :: ',res.body);
                
            done();
          });
    })

})