'use strict';

/* The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env . */
const env = require('dotenv').config();
/* apirest framework. */
const express = require('express');
/* Morgan is basically a logger, on any requests being made,it generates logs automatically. */
const morgan = require('morgan');
/* CORS is a nodejs package for providing a Connect/Express middleware that can be used to enable CORS with various options. */
const cors = require('cors');
/* config public folder */
const path = require('path');
const publicPath = path.resolve(__dirname, './public');
/* swagger */
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');



//Settings
/* setting port config */
const port = process.env.PORT || process.env.NODE_PORT || 8080;
/* init express app */
const app = express();
/* ip configs for req */
app.set('trust proxy', true);

//Middlewares
app.use(express.static(publicPath));
/* config morgan */
app.use(morgan('dev'));
/* parse application/json, basically parse incoming Request Object as a JSON Object  */
app.use(express.json());
/* parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays */
app.use(express.urlencoded({ extended: true }));
/* config cors */
app.use(cors());

//Settings Sockets
const app_process = require('http').createServer(app);
const io = require('socket.io')(app_process);

io.on('connect', (socket) => {
    socket.emit('notifications', 'Connected socket')
});

module.exports.getIO = () => io;

//Routes files
const usersRouter = require('./components/users/Routes');
const meetupsRouter = require('./components/meetups/Routes');
const guestsRouter = require('./components/guests/Routes');
const auth = require('./components/auth/AuthRoutes');

//Routes Urls
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec /*, { explorer: true }*/ ));
app.use('/users', usersRouter);
app.use('/meetups', meetupsRouter);
app.use('/guests', guestsRouter);
app.use('/auth', auth);

//Test Conection
app.get('/', function(req, res) { res.send('Hello Santander Apirest') });

//Server

try {
    module.exports.app = app_process.listen(port, () => {
        console.log(`application up and running on port: ${port}`);
    });
} catch (e) {
    console.log(e.message);
}