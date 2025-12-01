const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define('User', {
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    preferences: {
        type: DataTypes.JSON, // Stores { categories: [], sources: [], keywords: [] }
        defaultValue: { categories: [], sources: [], keywords: [] },
    },
    behavior: {
        type: DataTypes.JSON, // Stores { clicks: {}, impressions: {}, readTime: {} }
        defaultValue: { clicks: {}, impressions: {}, readTime: {} },
    },
});

module.exports = User;
