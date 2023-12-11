import { Sequelize, Dialect } from 'sequelize';

const sequelize = new Sequelize(
    process.env.DATABASE_NAME || '',
    process.env.DATABASE_USERNAME || '',
    process.env.DATABASE_PASSWORD || '',
    {
        dialect: process.env.DATABASE_DIALECT as Dialect || 'mysql', 
        host: process.env.DATABASE_HOST || 'localhost',
        logging: false,
    }
);

export default sequelize;
