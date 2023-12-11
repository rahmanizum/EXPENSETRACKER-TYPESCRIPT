import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/database';

class ForgotPasswords extends Model {
    id!: string;
    isactive!: boolean;
    UserId: any;
    createdAt: string | number | Date;
}

ForgotPasswords.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    isactive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'Forgotpasswords',
    timestamps: true, // Set to true if you want timestamps (createdAt and updatedAt) in your table
});

export default ForgotPasswords;
