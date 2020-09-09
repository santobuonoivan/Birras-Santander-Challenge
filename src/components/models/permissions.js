/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('permissions', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(permissions_id_seq::regclass)',
      comment: "null",
      primaryKey: true
    },
    'title': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'module': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'action': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    }
  }, {
    tableName: 'permissions'
  });
};
