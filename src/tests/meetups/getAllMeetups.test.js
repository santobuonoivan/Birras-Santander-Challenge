const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials, getTokenExpired } = require('./../utils');

//==================== get all meetups API test ====================

/**
 * Testing get all meetups endpoint
 */
describe('GET /meetups', function() {

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

    it('respond with json containing all meetups data', function(done) {
        request(app)
            .get('/meetups')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 200);
                res.should.be.json;

                res.body.should.be.instanceof(Array);
                res.body.should.matchEach(function(value) {
                    value.should.have.property('meetup_id').and.be.instanceof(Number);
                    value.should.have.property('name').and.be.instanceof(String);
                    value.should.have.property('date').and.be.instanceof(String);
                    value.should.have.property('time').and.be.instanceof(String);
                    value.should.have.property('description').and.be.instanceof(String);
                    value.should.have.property('city').and.be.instanceof(String);
                });
                done();
            });
    });
});


/**
 * Testing get all meetups endpoint with jwt malformed  
 */
describe('GET /meetups', function() {

    it('respond with json containing jwt malformed Exception data', function(done) {
        request(app)
            .get('/meetups')
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
 * Testing get all meetups endpoint with Bad Credentials 
 */
describe('GET /meetups', function() {

    let token = 'asdqw'
    it('respond with json containing Bad Credentials Exception data', function(done) {
        request(app)
            .get('/meetups')
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
 * Testing get all meetups endpoint with Token expired 
 */
describe('GET /meetups', function() {

    let token = getTokenExpired()
    it('respond with json containing Token expired Exception data', function(done) {
        request(app)
            .get('/meetups')
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