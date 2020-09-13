const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials } = require('./../utils');


//==================== create new meetup API test ====================

/**
 * Testing create new meetup endpoint (Successful request)
 */
describe('POST /meetups', function() {

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
            .post('/meetups')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 201);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('meetup_id').and.be.instanceof(Number);
                res.body.should.have.property('name').and.be.instanceof(String);
                res.body.should.have.property('date').and.be.instanceof(String);
                res.body.should.have.property('city').and.be.instanceof(String);
                res.body.should.have.property('time').and.be.instanceof(String);
                res.body.should.have.property('description').and.be.instanceof(String);
                done();
            });
    });
});

/**
 * Testing create a new meetups endpoint with Bad Credentials 
 */

describe('POST /meetups', function() {

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
            .get('/users')
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

/**
 * Testing create a new meetups endpoint with token TokenExpiredError 
 */
describe('POST /meetups', function() {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaXZhbkBpdmFuLmNvbSIsIm5hbWUiOiJQYWJsbyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoibWVjYWx1eCJ9LCJpYXQiOjE1OTk4NjA1NjUsImV4cCI6MTU5OTk0Njk2NX0.O93bXKszbJDoofKInbGsMSa7IDOmHpU126LndUs-48A';
    const newMeetupBody = {
        date: "09/12/2020",
        name: "Beer day",
        time: "20:00",
        city: "quilmes",
        description: "Beer day"
    };
    it('respond with json containing token expired Exception data', function(done) {
        request(app)
            .post('/meetups')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 403);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('message', 'El token de seguridad expiró');
                }
                done();
            });
    });
});

// TODO create test user and admin access