const MD5 = require('md5.js');
const bcrypt = require('bcrypt');
// const company = require('./company');
const jwt = require('jsonwebtoken');
const secretKey = 'tradeSecretKey';

module.exports = (sequelize, Sequelize) => {
    const UserPermission = sequelize.define(
        "UserPermission",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
            },
            path: {
                type: Sequelize.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "user_permission",
            freezeTableName: true,
            timestamps: true,
        }
    );

    UserPermission.migrate = async () => {
        const count = await UserPermission.count();

        if (!count) {
            await UserPermission.destroy({ truncate: true });
            await UserPermission.create({
                user_id: 1,
                path: "/getAllPositions"
            })
        }
    };

    return UserPermission;
}