import express from 'express';
import employeeRoutes from './routes/employee.routes';
import departmentRoutes from './routes/department.routes';

const app = express();

app.use(express.json());
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);

export default app;
