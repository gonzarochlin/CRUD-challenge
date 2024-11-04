import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Department from './department.model';
import Employee from './employee.model';

interface EmployeeDepartmentHistoryAttributes {
    id?: number;
    employeeId: number;
    previousDepartmentId: number;
    newDepartmentId: number;
    changeDate: Date;
}

class EmployeeDepartmentHistory extends Model<EmployeeDepartmentHistoryAttributes> implements EmployeeDepartmentHistoryAttributes {
    public id!: number;
    public employeeId!: number;
    public previousDepartmentId!: number;
    public newDepartmentId!: number;
    public changeDate!: Date;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

EmployeeDepartmentHistory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        previousDepartmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        newDepartmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        changeDate: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: 'employeeDepartmentHistory',
    }
);

EmployeeDepartmentHistory.belongsTo(Employee, { foreignKey: 'employeeId' });
EmployeeDepartmentHistory.belongsTo(Department, { as: 'previousDepartment', foreignKey: 'previousDepartmentId' });
EmployeeDepartmentHistory.belongsTo(Department, { as: 'newDepartment', foreignKey: 'newDepartmentId' });

export default EmployeeDepartmentHistory;
