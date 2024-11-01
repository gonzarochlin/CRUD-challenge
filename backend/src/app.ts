import express from 'express';
import employeeRoutes from './routes/employee.routes';
import departmentRoutes from './routes/department.routes';
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);

export default app;
