import Department from '../models/department.js';

export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll();
        res.json(departments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
