/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guests', {
    'meetup_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'user_id': {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "null",
      primaryKey: true
    },
    'checkin': {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      comment: "null"
    }
  }, {
    tableName: 'guests'
  });
};
