import { Request, Response } from 'express';
import Department from '../models/department.model';

export const getAllDepartments = async (req: Request, res: Response) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
