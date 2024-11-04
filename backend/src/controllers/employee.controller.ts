import { Request, Response } from 'express';
import Employee from '../models/employee.model';
import Department from '../models/department.model';
import EmployeeDepartmentHistory from 'models/employeeDepartmentHistory.model';

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.create(req.body);
        res.status(201).json(employee);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await Employee.findAll({ include: Department });
        res.json(employees);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    try {
        const employee = await Employee.findByPk(req.params.id, { include: Department });
        if(employee) {
            res.json(employee);
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {  
    try {
        const { id } = req.params;
        const { departmentId } = req.body;
        const employee = await Employee.findByPk(id, { include: Department });
    
        if (!employee) {
            res.status(404).json({ error: 'Employee not found' });
        }
    
        // Check if the department has changed
        if (departmentId && departmentId !== employee!.departmentId) {
            const previousDepartmentId = employee!.departmentId;
            const newDepartmentId = departmentId;
    
            // Log department change in history
            await EmployeeDepartmentHistory.create({
                employeeId: employee!.id,
                previousDepartmentId,
                newDepartmentId,
                changeDate: new Date(),
            });
        }
        
        // Update employee
        await employee!.update(req.body);
    
        res.json({ message: 'Employee updated' });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the employee' });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        // const deleted = await Employee.destroy({ where: { id: req.params.id } });
        const deleted = await Employee.update(
            { deletedAt: new Date() },
            { where: { id: req.params.id } }
        );
        
        if (deleted[0] === 1) {
            res.json({ message: 'Employee marked as deleted' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getEmployeeDepartmentHistory = async (req: Request, res: Response) => {
    const { employeeId } = req.params;

    try {
        const history = await EmployeeDepartmentHistory.findAll({
            where: { employeeId },
            include: [
                { model: Department, as: 'previousDepartment', attributes: ['id', 'name'] },
                { model: Department, as: 'newDepartment', attributes: ['id', 'name'] },
            ],
            order: [['changeDate', 'DESC']],
        });

        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching department history' });
    }
};
