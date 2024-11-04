import React, { useEffect, useState } from 'react';
import { IEmployee } from '../types/types';
import Employee from './Employee';
import EmployeeCreationForm from './EmployeeCreationForm';
import EmployeeDetails from './EmployeeDetails';
import { getAllEmployees, getEmployeeById, createEmployee } from '../services/api';

const EmployeeList = (): JSX.Element => {
    const [employees, setEmployees] = useState<IEmployee[]>([]);
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (error) {
                console.error('Failed to fetch employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const deleteEmployee = async (id: number) => {
        try {
            await deleteEmployee(id);
            setEmployees(employees.filter((emp) => emp.id !== id));
        } catch (error) {
            console.error('Failed to delete employee:', error);
        }
    };

    const detailsEmployee = async (id: number) => {
        try {
            setSelectedEmployeeId(id);
            const employeeDetails = await getEmployeeById(id);
            console.log('detailsEmployee', employeeDetails.data)
        } catch (error) {
            console.error('Failed to get employee:', error);
        }
    };

    const onCreateEmployee = async (employee: IEmployee) => {
        try {
            const newEmployeeResponse = await createEmployee(employee);
            setEmployees([...employees, {...employee, id: newEmployeeResponse.data.id}]);
        } catch (error) {
            console.error('Failed to create employee:', error);
        }
    };
    
    if(selectedEmployeeId) {
        return (
            <EmployeeDetails
                employeeId={selectedEmployeeId}
                onClose={() => setSelectedEmployeeId(null)}
            />
        )
    }
    
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
                        onCreateEmployee={(employee: IEmployee) => onCreateEmployee(employee)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
