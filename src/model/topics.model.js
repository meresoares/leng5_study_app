const { DataTypes } = require('sequelize')
const { sequelize } = require("../connection");

const TopicModel = sequelize.define('Topic', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primarykey: true,
        autoIncrement: true
    },

    create_date: {
        type: DataTypes.DATE,
        allowNull: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: true
    },

    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    order: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    priority: {
        type: DataTypes.INTEGER,
        aallowNull: true
    },
    
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },

    owner_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    
}, {
    tableName: 'topics',
    timestamps: false
});

module.exports = {
    TopicModel
}