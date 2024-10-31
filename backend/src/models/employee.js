import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Department from './department.js';

const Employee = sequelize.define('Employee', {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    hireDate: { type: DataTypes.DATE, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: true },
});

Employee.belongsTo(Department, { foreignKey: 'department_id' });

export default Employee;
