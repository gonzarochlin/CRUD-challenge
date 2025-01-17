import React, { useState, useEffect } from 'react';
import userAvatar from '../userAvatar.png';
import { formatHireDate } from '../utils/date';
import {
    useGetAllDepartmentsQuery,
    useUpdateEmployeeMutation,
    useGetEmployeeByIdQuery,
    useGetEmployeeDepartmentsHistoryByIdQuery,
} from '../redux/services/employeeApi';
import { EmployeeDetailsProps } from '../types/types';

const EmployeeDetails = ({ employeeId, onClose }: EmployeeDetailsProps): JSX.Element => {
    const { data: employee } = useGetEmployeeByIdQuery(employeeId);
    const { data: departments } = useGetAllDepartmentsQuery();
    const { data: employeeDepartmentHistory, refetch: refetchHistory } = useGetEmployeeDepartmentsHistoryByIdQuery(employeeId);
    
    const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);
    const [isModified, setIsModified] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const [updateEmployee] = useUpdateEmployeeMutation();

    useEffect(() => {
        setIsActive(!!employee?.isActive);
        setSelectedDepartment(employee?.department.id || null);
    }, [employee]);

    const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDepartmentId = parseInt(event.target.value);
        setSelectedDepartment(newDepartmentId);
        setIsModified(newDepartmentId !== employee?.departmentId);
    };

    const handleUpdateDepartment = async () => {
        if (!employee) return;
        try {
            if (selectedDepartment !== employee?.departmentId) {
                await updateEmployee({ id: employeeId, data: { departmentId: selectedDepartment! } });
                setIsModified(false);
                refetchHistory();  // Refetch department history after update
            }
        } catch (error) {
            console.error('Error updating department:', error);
        }
    };

    const handleToggleStatus = async () => {
        if (!employee) return;
        try {
            await updateEmployee({ id: employee.id!, data: { isActive: !isActive } })
            setIsActive(!isActive);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return employee ? (
        <>
            <div className='employee-details-container'>
                <div className='employee-details-header'>
                    <h2>{employee.firstName} {employee.lastName}</h2>
                    <button className='button-close' onClick={onClose}>Close</button>
                </div>

                <div className='employee-details-avatar-hiredate'>
                    <div className='employee-details-avatar-container'>
                        <img
                            src={userAvatar}
                            alt='Employee Avatar'
                            className='avatar'
                        />
                        {!isActive && <span className='inactive-label'>Inactive</span>}
                    </div>
                    <div className='employee-details-hiredate-container'>
                        <p><b>Hire Date:</b></p>
                        <p>{formatHireDate(employee.hireDate)}</p>
                        <button
                            onClick={handleToggleStatus}
                            className={ isActive ? 'button-close': 'button-green' }
                        >
                            {isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </div>
                </div>

                <div className='employee-details'>
                    <p><b>Employee ID:</b> {employee.id}</p>
                    <p><b>Department:</b> {employee.department.name}</p>
                    <p><b>Telephone:</b> {employee.phone}</p>
                    <p><b>Address:</b> {employee.address}</p>
                    <div className='employee-department-form'>
                        <b>Update Department:</b>
                        <select value={selectedDepartment ?? ''} onChange={handleDepartmentChange}>
                            {departments?.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={handleUpdateDepartment}
                        disabled={!isModified}
                        className={ isModified ? 'button-green' : 'button-disabled' }
                    >
                        Update
                    </button>
                </div>
            </div>

            <div className='department-history-container'>
                <h3>Department History</h3>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Department</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeDepartmentHistory?.length ? (
                        employeeDepartmentHistory.map((historyItem: any) => (
                            <tr key={historyItem.id}>
                                <td>{new Date(historyItem.changeDate).toLocaleDateString()}</td>
                                <td>{historyItem.previousDepartment.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3}>No department change history available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    ) : (
        <div className='employee-details-container'>
            <p>Loading...</p>
        </div>
    );
};

export default EmployeeDetails;
