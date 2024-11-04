import React, { useState } from 'react';
import Employee from './Employee';
import EmployeeCreationForm from './EmployeeCreationForm';
import EmployeeDetails from './EmployeeDetails';
import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from '../redux/services/employeeApi';

const EmployeeList = (): JSX.Element => {
    const { data: employees, error, isLoading } = useGetAllEmployeesQuery();
    const [ deleteEmployee ] = useDeleteEmployeeMutation();
    const [showCreationModal, setShowCreationModal] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    const detailsEmployee = async (id: number) => {
        try {
            setSelectedEmployeeId(id);
        } catch (error) {
            console.error('Failed to get employee:', error);
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
    
    if (error) return <p>Error loading employees.</p>;
    return (
        <div className="employee-list">
            <h1>Employees</h1>
            <button className='button-green' onClick={() => setShowCreationModal(true)}>
                New Employee
            </button>
            <div>
                {employees?.map((employeeData) => (
                    <Employee
                        key={employeeData.id}
                        employee={employeeData}
                        onDeleteEmployee={deleteEmployee}
                        onClickDetails={detailsEmployee}
                        />
                ))}
                {!employees?.length && (<h2>The list is empty</h2>)}
                {isLoading && <h2>Loading...</h2>}
            </div>

            {showCreationModal && (
                <div className="modal">
                    <EmployeeCreationForm
                        onClose={() => setShowCreationModal(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default EmployeeList;
