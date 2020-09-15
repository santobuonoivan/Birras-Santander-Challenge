const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials, getTokenExpired } = require('./../utils');
const moment = require('moment');

//==================== delete meetup API test ====================

/**
 * Testing delete meetup endpoint (Successful request)
 */


describe('DELETE /meetups/{meet_id}', function() {

    let token = null;
    let meetup_id = null;
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
    before(function(done) {
        const date = moment().add(3, 'days').format('DD/MM/YYYY');
        const newMeetupBody = {
            date: date,
            name: "Beer day",
            time: "20:00",
            city: "quilmes",
            description: "Beer day"
        };

        request(app)
            .post('/meetups')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newMeetupBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                meetup_id = res.body.meetup_id;
                done();
            })

    })
    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .delete(`/meetups/${meetup_id}`)
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

/**
 * Testing delete meetup endpoint ( Meetup id not found request)
 */
describe('DELETE /meetups/{meet_id}', function() {

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
            .delete('/meetups/999999')
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
 * Testing delete meetup endpoint ( Unautorized access request)
 */
describe('DELETE /meetups/{meet_id}', function() {

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


    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .delete('/meetups/3')
            .set('Accept', 'application/json')
            .set('token', token)
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
 * Testing delete meetup endpoint ( Token expired request)
 */
describe('DELETE /meetups/{meet_id}', function() {

    let token = getTokenExpired();


    it('respond with json containing a new meetup data', function(done) {
        request(app)
            .delete('/meetups/3')
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