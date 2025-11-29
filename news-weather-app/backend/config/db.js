const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite'),
    logging: false,
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQLite Connected.');

        // Import models to ensure they are registered
        require('../models/Pin');
        require('../models/WeatherCache');

        await sequelize.sync(); // Sync models
        console.log('Database Synced.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
