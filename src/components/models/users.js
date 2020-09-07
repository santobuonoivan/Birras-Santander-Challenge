/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    'user_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'name': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'username': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'password': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'email': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'perfil': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'users'
  });
};
