"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../util/database"));
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    paymentid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    orderid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "pending",
    }
}, {
    sequelize: database_1.default,
    modelName: 'Order',
    timestamps: true, // Set to true if you want timestamps (createdAt and updatedAt) in your table
});
exports.default = Order;
