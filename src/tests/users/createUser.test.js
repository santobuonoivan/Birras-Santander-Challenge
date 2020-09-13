const request = require('supertest');
const should = require('should');
const { app } = require('./../../index.js');
const { getUserCredentials } = require('./../utils');
//==================== create new user API test ====================

/**
 * Testing create new user endpoint (Successful request)
 */
describe('POST /users', function() {

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
    const newUserBody = {
        username: "example",
        name: "example",
        password: "example12345",
        email: "example@example.com"
    };

    it('respond with json containing a new user data', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                res.should.have.property('status', 201);
                res.should.be.json;
                res.body.should.be.instanceof(Object);
                res.body.should.have.property('user_id').and.be.instanceof(Number);
                res.body.should.have.property('name').and.be.instanceof(String);
                res.body.should.have.property('username').and.be.instanceof(String);
                res.body.should.have.property('email').and.be.instanceof(String);
                done();
            });
    });
});

/**
 * Testing create new user endpoint (Password incorrect format bad request)
 */

describe('POST /users', function() {

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
    let newUserBody = {
        username: "example",
        name: "example",
        password: "example",
        email: "example@example.com"
    };

    it('respond with json containing a user body error data (password)', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 400);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('error', 'Contraseña: Debe tener un mínimo de 10 caracteres!');
                }
                done();
            });
    });
});

/**
 * Testing create new user endpoint (Username exist bad request)
 */

describe('POST /users', function() {

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
    let newUserBody = {
        username: "example",
        name: "example",
        password: "example1124124515",
        email: "example1@example.com"
    };

    it('respond with json containing a user body error data (username exist)', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 400);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('error', 'El username ya está siendo usado');
                }
                done();
            });
    });
});

/**
 * Testing create new user endpoint (Email exist bad request)
 */

describe('POST /users', function() {

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
    let newUserBody = {
        username: "example1",
        name: "example",
        password: "example123456",
        email: "example@example.com"
    };

    it('respond with json containing a user body error data (email exist)', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 400);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('error', 'El email ya está siendo usado');
                }
                done();
            });
    });


});


/**
 * Testing create new user endpoint (Username required bad request)
 */

describe('POST /users', function() {

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
    let newUserBody = {
        name: "example",
        password: "example123456",
        email: "example123123@example.com"
    };

    it('respond with json containing a user body error data (username required)', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 400);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('error', 'Nombre de usuario: Es requerido!');
                }
                done();
            });
    });
});

/**
 * Testing create new user endpoint (Username required bad request)
 */

describe('POST /users', function() {

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
    let newUserBody = {
        username: "example1231241",
        name: "example",
        password: "example123456",
        //email: "example123123@example.com"
    };

    it('respond with json containing a user body error data (email required)', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) {
                    res.should.have.property('status', 400);
                    res.should.be.json;
                    //Response status
                    res.body.should.have.property('error', 'Email: Es requerido!');
                }
                done();
            });
    });
});

/**
 * Testing create new user endpoint with Unautorized  
 */

describe('POST /users', function() {

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

    let newUserBody = {
        username: "example1231241",
        name: "example",
        password: "example123456",
        email: "example1231235123@example.com"
    };

    it('respond with json containing Unautorized Exception data', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
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
 * Testing create new user endpoint with jwt malformed  
 */

describe('POST /users', function() {

    let newUserBody = {
        username: "example1231241",
        name: "example",
        password: "example123456",
        email: "example1231235123@example.com"
    };

    it('respond with json containing jwt malformed Exception data', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .send(newUserBody)
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
 * Testing create new user endpoint with Bad Credentials 
 */

describe('POST /users', function() {

    let token = 'asdqw'
    let newUserBody = {
        username: "example1231241",
        name: "example",
        password: "example123456",
        email: "example1231235123@example.com"
    };
    it('respond with json containing Bad Credentials Exception data', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
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
 * Testing create new user endpoint with token TokenExpiredError 
 */

describe('POST /users', function() {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiaXZhbkBpdmFuLmNvbSIsIm5hbWUiOiJQYWJsbyIsInVzZXJfaWQiOjEsInVzZXJuYW1lIjoibWVjYWx1eCJ9LCJpYXQiOjE1OTk4NjA1NjUsImV4cCI6MTU5OTk0Njk2NX0.O93bXKszbJDoofKInbGsMSa7IDOmHpU126LndUs-48A';
    let newUserBody = {
        username: "example1231241",
        name: "example",
        password: "example123456",
        email: "example1231235123@example.com"
    };
    it('respond with json containing token expired Exception data', function(done) {
        request(app)
            .post('/users')
            .set('Accept', 'application/json')
            .set('token', token)
            .send(newUserBody)
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