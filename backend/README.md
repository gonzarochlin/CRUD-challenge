# Backend Setup
1. Install Dependencies:

```bash
cd backend
npm i
```

2. Run the server:

```bash
npm run dev
```
> The backend uses `npx tsx` [(this library)](https://github.com/privatenumber/tsx) to run TypeScript files without needing a separate compilation step.

The backend will run on http://localhost:80


# API Endpoints
The backend API has the following endpoints:

- `POST /employees` - Create a new employee
- `GET /employees` - Retrieve all employees
- `GET /employees/:id` - Retrieve a single employee by ID
- `PUT /employees/:id` - Update an employee
- `DELETE /employees/:id` - Delete an employee
- `GET /departments` - Retrieve all departments
- `GET /employees/:id/history` - Fetch the department change history for an employee.
