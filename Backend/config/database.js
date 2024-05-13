const Sequelize = require('sequelize');

// Initialize Sequelize with your database credentials
const sequelize = new Sequelize('Registration_Form', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
