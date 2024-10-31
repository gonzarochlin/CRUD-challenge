import express from 'express';
import employeeRoutes from './routes/employeeRoutes.js';
import departmentRoutes from './routes/departmentRoutes.js';

const app = express();

app.use(express.json());
app.use('/employees', employeeRoutes);
app.use('/departments', departmentRoutes);

export default app;
