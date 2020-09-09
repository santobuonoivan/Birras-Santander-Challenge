const env = require('dotenv').config();

const {username,password,database,host,dialect, port,ssl} = require('./postgres.config')[process.env.NODE_ENV];
const Sequelize = require('sequelize');
const sequelize = new Sequelize(database,username,password,{
    host:host,
    dialect:dialect,
    port:port,
    define: {
        timestamps: false
    }
});

const db ={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('../components/models/users')(sequelize,Sequelize);
db.meetups = require('../components/models/meetups')(sequelize,Sequelize);
db.guests = require('../components/models/guests')(sequelize,Sequelize);
db.roles = require('../components/models/roles')(sequelize,Sequelize);
db.user_roles = require('../components/models/user_roles')(sequelize,Sequelize);
db.permissions = require('../components/models/permissions')(sequelize,Sequelize);
db.permission_role = require('../components/models/permission_role')(sequelize, Sequelize);

/* relations */
db.users.belongsToMany(db.roles, {through:'user_roles', foreignKey:'user_id'});
db.roles.belongsToMany(db.users, {through: 'user_roles', foreignKey: 'role_id'});
db.roles.belongsTo(db.roles, {foreignKey:'parent'});
db.permissions.belongsToMany(db.roles, {through: 'permission_role', foreignKey:'permission_id', otherKey: 'permission_id'});


db.sequelize.sync({force:false}).then(() =>  {
});

module.exports =  db;
