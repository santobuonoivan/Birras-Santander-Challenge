const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials, getTokenExpired } = require('./../utils');

//==================== inscription meetup API test ====================

/**
 * Testing inscription meetup endpoint (Successful request)
 */
describe('POST /guests/inscription/{meet_id}', function() {

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


    it('respond with json containing a inscription  successful data', function(done) {
        request(app)
            .post('/guests/inscription/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.property('status', 201);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('meetup_id').and.be.instanceof(Number);
                res.body.should.have.property('user_id').and.be.instanceof(Number);
                res.body.should.have.property('checkin').and.be.instanceof(Boolean);
                done();
            });
    });
});

/**
 * Testing inscription meetup endpoint (Successful request)
 */
describe('POST /guests/inscription/{meet_id}', function() {

    let token = null;
    const { username, password } = getUserCredentials('USUARIO');
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


    it('respond with json containing a inscription  successful data', function(done) {
        request(app)
            .post('/guests/inscription/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.property('status', 201);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('meetup_id').and.be.instanceof(Number);
                res.body.should.have.property('user_id').and.be.instanceof(Number);
                res.body.should.have.property('checkin').and.be.instanceof(Boolean);
                done();
            });
    });
});

/**
 * Testing inscription meetup endpoint ( Meetup id not found request)
 */
describe('POST /guests/inscription/{meet_id}', function() {

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


    it('respond with json containing a ItemNotFound Exception data', function(done) {
        request(app)
            .post('/guests/inscription/999999')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 404);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('error').and.be.instanceof(String);
                done();
            });
    });
});

/**
 * Testing inscription meetup endpoint ( Token expired request)
 */
describe('POST /guests/inscription/{meet_id}', function() {

    let token = getTokenExpired();

    it('respond with json containing a Token expired data', function(done) {
        request(app)
            .post('/guests/inscription/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 401);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('message').and.be.instanceof(String);
                done();
            });
    });
});

/**
 * Testing inscription meetup endpoint with Bad Credentials 
 */

describe('POST /guests/inscription/{meet_id}', function() {

    let token = 'asdqw';
    it('respond with json containing Bad Credentials Exception data', function(done) {
        request(app)
            .post('/guests/inscription/1')
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