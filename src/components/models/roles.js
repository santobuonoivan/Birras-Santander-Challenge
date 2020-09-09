/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    'id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(roles_id_seq::regclass)',
      comment: "null",
      primaryKey: true
    },
    'name': {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "null"
    },
    'parent': {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "null"
    },
    'is_active': {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      comment: "null"
    },
    'created_at': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    },
    'updated_at': {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'roles'
  });
};
