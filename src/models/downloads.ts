import { Model, DataTypes } from 'sequelize';
import sequelize from '../util/database';

class Downloads extends Model {
    id!: number;
    downloadUrl!: string;
}

Downloads.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    downloadUrl: {
        type: DataTypes.STRING,
        unique: true,
        validate: { isUrl: true },
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Downloads',
    timestamps: true, 
});

export default Downloads;
