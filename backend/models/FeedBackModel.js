const { DataTypes } = require('sequelize');
const sequelize = require('../db');

// Define the Feedback model
const Feedback = sequelize.define('Feedback', {
    feedback: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    sentiment: {
        type: DataTypes.ENUM('positive', 'neutral', 'negative'),
        allowNull: false,
    },
});

module.exports = Feedback;
