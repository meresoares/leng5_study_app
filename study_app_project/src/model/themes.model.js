const {DataTypes} = require('sequelize')
const {sequelize} = require("../../connection");

const ThemesModel = sequelize.define('Themes', {
    id: {
        type: DataTypes.INTEGER, allowNull: false, primarykey: true, autoIncrement: true,
    },
    create_date: {
        type: DataTypes.TIME, allowNull: true,
    },
    name: {
        type: DataTypes.STRING, allowNull: true,
    },
    description: {
        type: DataTypes.STRING, allowNull: true,
    },
    keywords: {
        type: DataTypes.STRING, allowNull: true,
    },
    owner_user_id: {
        type: DataTypes.INTEGER, allowNull: true
    },
    deleted: {
        type: DataTypes.BOOLEAN, allowNull: false,
    }
}, {
    tableName: 'themes',
    timestamps: false
});
module.exports = {
    ThemesModel
}