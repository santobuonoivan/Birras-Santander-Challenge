const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials, getTokenExpired } = require('./../utils');

//==================== get meetup info API test ====================

/**
 * Testing get meetup info endpoint ( Successful request ADMIN)
 */
describe('GET /meetups/info/{meetup_id}', function() {

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

    it('respond with json containing meetup info data', function(done) {
        request(app)
            .get('/meetups/info/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('name').and.be.instanceof(String);
                res.body.should.have.property('date').and.be.instanceof(String);
                res.body.should.have.property('time').and.be.instanceof(String);
                res.body.should.have.property('description').and.be.instanceof(String);
                res.body.should.have.property('city').and.be.instanceof(String);
                res.body.should.have.property('temp').and.be.instanceof(Number);
                done();
            });
    });
});

/**
 * Testing get meetup info endpoint ( Successful request USUARIO)
 */
describe('GET /meetups/info/{meetup_id}', function() {

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

    it('respond with json containing meetup info data', function(done) {
        request(app)
            .get('/meetups/info/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('name').and.be.instanceof(String);
                res.body.should.have.property('date').and.be.instanceof(String);
                res.body.should.have.property('time').and.be.instanceof(String);
                res.body.should.have.property('description').and.be.instanceof(String);
                res.body.should.have.property('city').and.be.instanceof(String);
                res.body.should.have.property('temp').and.be.instanceof(Number);
                done();
            });
    });
});


/**
 * Testing get meetup info endpoint with jwt malformed  
 */
describe('GET /meetups/info/{meetup_id}', function() {

    it('respond with json containing jwt malformed Exception data', function(done) {
        request(app)
            .get('/meetups/info/1')
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
 * Testing get meetup info endpoint with Bad Credentials 
 */
describe('GET /meetups/info/{meetup_id}', function() {

    let token = 'asdqw'
    it('respond with json containing Bad Credentials Exception data', function(done) {
        request(app)
            .get('/meetups/info/1')
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

/**
 * Testing get meetup info endpoint with Token expired 
 */
describe('GET /meetups/info/{meetup_id}', function() {

    let token = getTokenExpired()
    it('respond with json containing Token expired Exception data', function(done) {
        request(app)
            .get('/meetups/info/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 401);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('message', 'El token de seguridad expiró');
                }
                done();
            });
    });
});

/**
 * Testing get meetup info endpoint ( Meetup id not found request)
 */
describe('GET /meetups/{meet_id}', function() {

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

    it('respond with json containing a not found error data', function(done) {
        request(app)
            .get('/meetups/info/999999')
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