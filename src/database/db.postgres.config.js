const env = require('dotenv').config();

const {username,password,database,host,dialect, pool} = require('./config')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database,username,password,{
    host:host,
    dialect:dialect,
    pool:pool
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../components/models/users')(sequelize,Sequelize);
db.meetups = require('../components/models/meetups')(sequelize,Sequelize);
db.guests = require('../components/models/guests')(sequelize,Sequelize);

db.sequelize.sync({force:false}).then(() =>  {
});

module.exports =  db;
