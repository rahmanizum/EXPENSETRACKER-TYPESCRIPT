import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/database';

class User extends Model {
    createForgotpassword(arg0: {}) {
        throw new Error('Method not implemented.');
    }
    id!: number;
    name!: string;
    email!: string;
    password!: string;
    totalexpenses!: number;
    ispremiumuser!: boolean;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    totalexpenses: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00,
    },
    ispremiumuser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true, 
});

export default User;
