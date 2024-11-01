import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

interface DepartmentAttributes {
	id?: number;
	name: string;
}

class Department extends Model<DepartmentAttributes> implements DepartmentAttributes {
	public id!: number;
	public name!: string;

	// Timestamps
	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

Department.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'department',
    }
);

export default Department;
