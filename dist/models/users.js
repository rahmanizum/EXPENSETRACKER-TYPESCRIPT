"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../util/database"));
class User extends sequelize_1.Model {
    createForgotpassword(arg0) {
        throw new Error('Method not implemented.');
    }
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    totalexpenses: {
        type: sequelize_1.DataTypes.FLOAT,
        defaultValue: 0.00,
    },
    ispremiumuser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize: database_1.default,
    modelName: 'User',
    timestamps: true, // Set to true if you want timestamps (createdAt and updatedAt) in your table
});
exports.default = User;
