/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meetups', {
    'meetup_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'date': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'time': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'name': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'description': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    },
    'city': {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'meetups'
  });
};
