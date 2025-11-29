const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pin = sequelize.define('Pin', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lat: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    lon: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    userId: {
        type: DataTypes.STRING, // Placeholder for future auth
        allowNull: true,
    },
}, {
    timestamps: true,
});

module.exports = Pin;
