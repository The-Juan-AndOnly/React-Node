const Sequelize = require('sequelize');

const sequelize = require('../db/database');

const Course = sequelize.define('course', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },

  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estimatedTime: {
    type: Sequelize.STRING
  },
  materialsNeeded: {
    type: Sequelize.STRING
  }
});

module.exports = Course;
