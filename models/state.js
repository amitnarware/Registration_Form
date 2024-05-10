const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const State = sequelize.define('State', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = State;
