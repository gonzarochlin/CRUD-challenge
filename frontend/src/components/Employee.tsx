import React from 'react';
import { IEmployeeProps } from '../types/types';
import userAvatar from '../userAvatar.png';
import { formatHireDate } from '../utils/date';

const Employee = (props: IEmployeeProps): JSX.Element => {
    const { employee, onDeleteEmployee, onClickDetails } = props;
    const {
        id,
        firstName,
        lastName,
        department,
        hireDate,
        isActive,
    } = employee;

    return (
        <div className='employee-container'>
            <div className='employee-info'>
                <div className='employee-avatar-container'>
                    <img
                        src={userAvatar}
                        alt='Employee Avatar'
                        className={!isActive ? 'avatar-inactive' : undefined}    
                    />
                </div>
                <div className='employee-data-container'>
                    <div className='employee-title'>
                        <span className='employee-name'>{firstName} {lastName}</span>
                        <span>{` (${department?.name})`}</span>
                    </div>
                    <span className='employee-hiredate-title'>Hire Date</span>
                    <span className='employee-hiredate'>{formatHireDate(hireDate)}</span>
                </div>
            </div>
            <div className='employee-buttons-container'>
                <button className='button-green' onClick={() => onClickDetails(id || -1)}>View Details</button>
                <button className='button-delete' onClick={() => onDeleteEmployee(id || -1)}>X</button>
            </div>
        </div>
    );
};

export default Employee;
