"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME || '', process.env.DATABASE_USERNAME || '', process.env.DATABASE_PASSWORD || '', {
    dialect: process.env.DATABASE_DIALECT || 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    logging: false,
});
exports.default = sequelize;
