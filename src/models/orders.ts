import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/database';

class Order extends Model {
    id!: number;
    paymentid?: string | null;
    orderid!: string;
    status!: string;
}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    paymentid: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    orderid: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "pending",
    }
}, {
    sequelize,
    modelName: 'Order',
    timestamps: true, // Set to true if you want timestamps (createdAt and updatedAt) in your table
});

export default Order;
