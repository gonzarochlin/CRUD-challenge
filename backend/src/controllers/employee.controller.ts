import { Request, Response } from 'express';
import Employee from '../models/employee.model';
import Department from '../models/department.model';

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
        const [updated] = await Employee.update(req.body, { where: { id: req.params.id } });
        if(updated) {
            res.json({ message: 'Employee updated' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const deleted = await Employee.destroy({ where: { id: req.params.id } });
        if(deleted) {
            res.json({ message: 'Employee deleted' });
        } else {
            res.status(404).json({ error: 'Employee not found' });
        }
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
