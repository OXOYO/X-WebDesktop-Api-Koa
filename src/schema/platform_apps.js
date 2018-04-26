/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('platform_apps', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    user_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    publish: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    config: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'platform_apps'
  });
};
