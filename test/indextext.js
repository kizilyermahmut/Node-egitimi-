const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../app');
chai.use(chaiHttp);

describe('Node Server', () => {
    it('(GET /) anasayfayı 1 döndürür', (done) => {
        chai.request(server)
        .get('/api/movies')
        .end((err,res) => {
            res.should.have.status(200);
            done();
            
        })
    });
});
