const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const State = require("./state");
const Country = require("./country");

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1 // Assuming 1 is the ID for a default state
  },
  zip: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  countryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1 // Assuming 1 is the ID for a default country
  },
  areaOfInterest: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.belongsTo(State, { foreignKey: 'stateId' });
User.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = User;
