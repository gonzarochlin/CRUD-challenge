import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Department from './department.model';

interface EmployeeAttributes {
    id?: number;
    firstName: string;
    lastName: string;
    hireDate: Date;
    departmentId: number;
    phone: string;
    address: string;
    isActive: boolean;
}

class Employee extends Model<EmployeeAttributes> implements EmployeeAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public hireDate!: Date;
    public departmentId!: number;
    public phone!: string;
    public address!: string;
    public isActive!: boolean;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Employee.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hireDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'employee',
    }
);

Employee.belongsTo(Department, { foreignKey: 'departmentId' });

export default Employee;
