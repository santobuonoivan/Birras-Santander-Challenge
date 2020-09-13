const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials } = require('./../utils');

//==================== get all users API test ====================

/**
 * Testing get all users endpoint
 */
describe('GET /users', function() {

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

    it('respond with json containing all users data', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 200);
                res.should.be.json;

                res.body.should.be.instanceof(Array);
                res.body.should.matchEach(function(value) {
                    value.should.have.property('user_id').and.be.instanceof(Number);
                    value.should.have.property('name').and.be.instanceof(String);
                    value.should.have.property('username').and.be.instanceof(String);
                    value.should.have.property('email').and.be.instanceof(String);
                });
                done();
            });
    });
});

/**
 * Testing get all users endpoint with Unautorized  
 */
describe('GET /users', function() {

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
    it('respond with json containing Unautorized Exception data', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 401);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('message', 'Unauthorized access');
                }
                done();
            });
    });
});

/**
 * Testing get all users endpoint with jwt malformed  
 */
describe('GET /users', function() {

    it('respond with json containing jwt malformed Exception data', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 401);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('message', 'jwt malformed ');
                }
                done();
            });
    });
});


/**
 * Testing get all users endpoint with Bad Credentials 
 */
describe('GET /users', function() {

    let token = 'asdqw'
    it('respond with json containing Bad Credentials Exception data', function(done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 403);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('message', 'Bad Credentials');
                }
                done();
            });
    });
});