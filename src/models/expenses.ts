import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/database';

class Expenses extends Model {
    id!: number;
    category!: string;
    pmethod!: string;
    amount!: number;
    date!: Date;
}

Expenses.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pmethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Expenses',
    timestamps: true, // Set to true if you want timestamps (createdAt and updatedAt) in your table
});

export default Expenses;
