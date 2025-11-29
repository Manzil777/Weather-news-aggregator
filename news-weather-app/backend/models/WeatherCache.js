const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const WeatherCache = sequelize.define('WeatherCache', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    queryKey: { // Can be "cityname" or "lat,lon"
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    data: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
});

module.exports = WeatherCache;
