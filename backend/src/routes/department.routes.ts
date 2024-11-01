import express from 'express';
import { getAllDepartments } from '../controllers/department.controller';

const router = express.Router();

router.get('/', getAllDepartments);

export default router;
