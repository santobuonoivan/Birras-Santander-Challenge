const jwt = require('jsonwebtoken');
const config = require('config');
const _= require('lodash');
//const {users, roles, permissions, permission_role, permission_user, user_roles } = require('../database/db.config');
const {users, roles, permissions, permission_role, user_roles } = require('./../database/db.postgres.config');

module.exports = function haspermissions(module, action){
    return async function (req, res, next) {
        const { user_id } = req.user;
        //retrieves user
        let user = await users.findByPk( user_id/*, {include:['permissions', 'roles']}*/);
        if( !user )
            return res.status(404).json({error:'user not found'});

        //retrieves permission specific permission for this url
        let permissionsdb = await permissions.findOne({where:{module:module, action:action}}); // await permissions.findOne({where:{module:module, action:action}});

        //TODO add this block of code to nodeusersapp
        if(permissionsdb === null){
            return res.status(404).send({"error":`permissions not found for module: ${module}, action: ${action}, please consult system admin`});
        }

        // retrieves all roles with this permission
        let permissions_roles_db = await permission_role.findAll({where:{permission_id:permissionsdb.id}});

        // retrieves all user roles
        let user_roles_db = await user_roles.findAll({where:{user_id:user.user_id}}).catch( reason => {
            console.log(reason);
        });
        const reverse = await reverseLookUp(permissions_roles_db,user_roles_db);
        console.log(reverse)
        if(reverse)
            return next();
        return res.status(401).send({message:"Unauthorized access"});
    }
}

async function reverseLookUp(permissions_roles_db, user_roles_db){
    let permissions_roles_ids = new Array(), user_roles_ids = new Array();
    for (let i = 0; i < permissions_roles_db.length; i++) {
        permissions_roles_ids.push(permissions_roles_db[i].role_id);
    }
    for (let i = 0; i < user_roles_db.length; i++) {
        user_roles_ids.push(user_roles_db[i].role_id);
    }
    for (let i = 0; i < user_roles_ids.length; i++) {
        if(permissions_roles_ids.includes(user_roles_ids[i])){
            return true;
        }
    }
    for (let i = 0; i < permissions_roles_ids.length; i++) {
        let actualRole = await roles.findByPk(permissions_roles_ids[i]);
        if(user_roles_ids.includes(actualRole.id)){
            return true;
        }
        while(actualRole.parent != null){
            actualRole = await roles.findByPk(actualRole.parent);
            if(user_roles_ids.includes(actualRole.id)){
                return true;
            }
        }
    }
    return false;
};