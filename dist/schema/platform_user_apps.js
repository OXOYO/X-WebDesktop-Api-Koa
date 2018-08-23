'use strict';

/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('platform_user_apps', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    app_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    app_name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    app_title: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    app_description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    app_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    app_publish: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    app_category: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    user_type: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    private: {
      type: DataTypes.INTEGER(1),
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
    tableName: 'platform_user_apps'
  });
};