const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials } = require('./../utils');

//==================== delete meetup API test ====================

/**
 * Testing delete meetup endpoint ( Meetup id not found request)
 */
describe('DELETE /users/{user_id}', function() {

    let token = null;
    const { username, password } = getUserCredentials('ADMIN');
    before(function(done) {
        request(app)
            .post('/auth')
            .send({ username, password })
            .end(function(err, res) {
                token = res.body.token;
                console.log(token);
                done();
            });
    });

    it('respond with json containing a delete successful message data', function(done) {
        request(app)
            .delete('/users/9')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('message').and.be.instanceof(String);
                done();
            });
    });
});