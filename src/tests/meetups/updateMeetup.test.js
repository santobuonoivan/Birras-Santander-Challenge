const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials, getTokenExpired } = require('./../utils');

//==================== update meetup API test ====================

/**
 * Testing update meetup endpoint (Successful request)
 */
describe('PUT /meetups/{meet_id}', function() {

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
    const newMeetupBody = {
        date: "17/09/2020",
        name: "Beer day",
        time: "20:00",
        city: "quilmes",
        description: "Beer day"
    };

    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .put('/meetups/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
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

/**
 * Testing update meetup endpoint ( Meetup id not found request)
 */
describe('PUT /meetups/{meet_id}', function() {

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
    const newMeetupBody = {
        date: "09/12/2020",
        name: "Beer day",
        time: "20:00",
        city: "quilmes",
        description: "Beer day"
    };

    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .put('/meetups/999999')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
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
 * Testing update meetup endpoint ( Unautorized access request)
 */
describe('PUT /meetups/{meet_id}', function() {

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
    const newMeetupBody = {
        date: "09/12/2020",
        name: "Beer day",
        time: "20:00",
        city: "quilmes",
        description: "Beer day"
    };

    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .put('/meetups/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 401);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('error').and.be.instanceof(String);
                done();
            });
    });
});

/**
 * Testing update meetup endpoint ( Token expired request)
 */
describe('PUT /meetups/{meet_id}', function() {

    let token = getTokenExpired();
    const newMeetupBody = {
        date: "09/12/2020",
        name: "Beer day",
        time: "20:00",
        city: "quilmes",
        description: "Beer day"
    };

    it('respond with json containing a Token expired data', function(done) {
        request(app)
            .put('/meetups/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
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
 * Testing create a new meetups endpoint with Bad Credentials 
 */

describe('PUT /meetups/{meet_id}', function() {

    let token = 'asdqw';
    const newMeetupBody = {
        date: "09/12/2020",
        name: "Beer day",
        time: "20:00",
        city: "quilmes",
        description: "Beer day"
    };
    it('respond with json containing Bad Credentials Exception data', function(done) {
        request(app)
            .put('/meetups/1')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
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