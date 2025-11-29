const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Article = sequelize.define('Article', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    urlToImage: {
        type: DataTypes.STRING,
    },
    sourceName: {
        type: DataTypes.STRING,
    },
    publishedAt: {
        type: DataTypes.STRING,
    },
    savedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Article;
