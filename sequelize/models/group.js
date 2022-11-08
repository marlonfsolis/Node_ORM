'use strict';

const { Model, DataTypes } = require('sequelize');

// const Group = (sequelize, DataTypes) => {
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Group.init({
    name: {type: DataTypes.STRING, primaryKey: true},
    description: DataTypes.STRING,
    testingAddColumn: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Group',
    tableName: 'Group'
  });

  return Group;
};


