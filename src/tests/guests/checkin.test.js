const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials, getTokenExpired } = require('./../utils');

//==================== check_in meetup API test ====================

/**
 * Testing check_in meetup endpoint (Successful request)
 */
// TODO descomentar
/*
describe('PUT /guests/check_in/{meet_id}/{user_id}', function() {

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


    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .put('/guests/check_in/1/2')
            .set('Accept', 'application/json')
            .set('token', token)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                console.log(res.body);
                res.should.have.property('status', 200);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('message').and.be.instanceof(String);
                done();
            });
    });
});

/**
 * Testing check_in meetup endpoint ( Meetup id not found request)
 */
describe('PUT /guests/check_in/{meet_id}/{user_id}', function() {

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
            .put('/guests/check_in/999999/99999')
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
 * Testing check_in meetup endpoint ( Token expired request)
 */
describe('PUT /guests/check_in/{meet_id}/{user_id}', function() {

    let token = getTokenExpired();

    it('respond with json containing a Token expired data', function(done) {
        request(app)
            .put('/guests/check_in/1/2')
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
 * Testing check_in meetup endpoint with Bad Credentials 
 */

describe('PUT /guests/check_in/{meet_id}/{user_id}', function() {

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
            .put('/guests/check_in/1/2')
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