import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IEmployee } from '../types/types';
import Employee from './Employee';
import EmployeeCreationForm from './EmployeeCreationForm';

const EmployeeList = (): JSX.Element => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [showCreationModal, setShowCreationModal] = useState(false);

    // Fetch employees from the server
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:3000/employees');
                setEmployees(response.data);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const deleteEmployee = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/employees/${id}`);
            setEmployees(employees.filter((emp) => emp.id !== id));
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    };

    const detailsEmployee = async (id: number) => {
        try {
            const employeeDetails = await axios.get(`http://localhost:3000/employees/${id}`);
            console.log('detailsEmployee', employeeDetails.data)
        } catch (error) {
            console.error('Failed to get employee:', error);
        }
    };

    const createEmployee = async (employee: IEmployee) => {
        try {
            const data = JSON.stringify(employee); 
            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/employees/',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data,
            };
            const newEmployeeResponse = await axios.request(config);
            setEmployees([...employees, {...employee, id: newEmployeeResponse.data.id}]);
        } catch (error) {
            console.error('Failed to create employee:', error);
        }
    };

    return (
        <div className="employee-list">
            <h1>Employees</h1>
            <button className='button-green' onClick={() => setShowCreationModal(true)}>
                New Employee
            </button>
            <div>
                {employees.map((employeeData) => (
                    <Employee
                        key={employeeData.id}
                        employee={employeeData}
                        onDeleteEmployee={deleteEmployee}
                        onClickDetails={detailsEmployee}
                        />
                ))}
            </div>

            {showCreationModal && (
                <div className="modal">
                    <EmployeeCreationForm
                        onClose={() => setShowCreationModal(false)}
                        onCreateEmployee={(employee: IEmployee) => createEmployee(employee)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
