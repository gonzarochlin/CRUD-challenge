import React, { useEffect } from 'react';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';
import { IEmployeeProps } from '../types/types';
import userAvatar from '../userAvatar.png';

const Employee = (props: IEmployeeProps): JSX.Element => {
    const { employee, onDeleteEmployee, onClickDetails } = props;
    const {
        id,
        firstName,
        lastName,
        department,
        hireDate,
    } = employee;

    // Calculate hire date and format it
    const formatHireDate = (hireDate: string) => {
        const date = new Date(hireDate);
        const formattedDate = format(date, 'MMM d, yyyy');
        const years = differenceInYears(new Date(), date);
        const months = differenceInMonths(new Date(), date) % 12;
        const days = differenceInDays(new Date(), date) % 30;
        return `${formattedDate} (${years}y – ${months}m – ${days}d)`;
    };

    return (
        <div className='employee-container'>
            <div className='employee-info'>
                <div className='employee-avatar-container'>
                    <img
                    src={userAvatar}
                    alt='Employee Avatar'
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
