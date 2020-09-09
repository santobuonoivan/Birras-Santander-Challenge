/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_roles', {
    'user_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'role_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'user_roles'
  });
};
