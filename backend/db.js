const { Sequelize } = require('sequelize');

// Create a new Sequelize instance (MySQL database connection)
const sequelize = new Sequelize('feedbackdb', 'root', 'Abhi@123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

// Test the connection
const testConnection = async () => {
    try {
        await sequelize.authenticate(); // Use await for async method
        console.log('Database connection established.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

// Call the test connection function
testConnection();

module.exports = sequelize;
