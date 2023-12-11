"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../util/database"));
class Downloads extends sequelize_1.Model {
}
Downloads.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    downloadUrl: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        validate: { isUrl: true },
        allowNull: false,
    }
}, {
    sequelize: database_1.default,
    modelName: 'Downloads',
    timestamps: true,
});
exports.default = Downloads;
