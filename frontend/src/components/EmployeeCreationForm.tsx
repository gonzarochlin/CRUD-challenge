import React, { useState } from 'react';
import { IEmployee, } from '../types/types';
import { useCreateEmployeeMutation, useGetAllDepartmentsQuery } from '../redux/services/employeeApi';
import { EmployeeCreationFormProps } from '../types/types';

const EmployeeCreationForm = (props: EmployeeCreationFormProps): JSX.Element => {
  const { onClose } = props;
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [hireDate, setHireDate] = useState(new Date().toISOString().substring(0,10));
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);

  const [createEmployee] = useCreateEmployeeMutation();
  const { data: departments, error, isLoading } = useGetAllDepartmentsQuery();

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDepartmentId = parseInt(event.target.value);
    setSelectedDepartment(newDepartmentId);
  };

  const clearForm = (): void => {
    setFirstName('');
    setLastName('');
    setPhone('');
    setAddress('');
    setHireDate(new Date().toISOString().substring(0,10));
    setSelectedDepartment(null);
  }

  const handleCreate = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!selectedDepartment) return;

    const employeeToCreate: IEmployee = {
      firstName,
      lastName,
      hireDate,
      phone,
      address,
      departmentId: selectedDepartment,
      department: departments!.filter(dept => dept.id === selectedDepartment)[0],
      isActive: true,
    };

    await createEmployee(employeeToCreate);
    clearForm();
  }

  return (
    <div className='employee-creation-container'>
      <h1>Create Employee</h1>
      <form onSubmit={handleCreate}>
        <div className='employee-creation-form'>
          <div className='employee-creation-group'>
            <label>First Name</label>
            <input type="text" value={firstName} onChange={(event) => setFirstName(event.target.value)} required />
          </div>
          <div className='employee-creation-group'>
            <label>Last Name</label>
            <input type="text" value={lastName} onChange={(event) => setLastName(event.target.value)} required />
          </div>
          <div className='employee-creation-group'>
            <label>Hire Date</label>
            <input type="date" value={hireDate} onChange={(event) => setHireDate(event.target.value)} required />
          </div>
          <div className='employee-creation-group'>
            <label>Phone</label>
            <input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} required />
          </div>
          <div className='employee-creation-group'>
            <label>Address</label>
            <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} required />
          </div>

          <div className='employee-creation-group'>
            <label>Department</label>
            <select value={selectedDepartment ?? ''} onChange={handleDepartmentChange} required>
              <option value=''>Select a department</option>
              {departments?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className='employee-creation-buttons'>
          <button className='button-close' onClick={onClose}>
            Cancel
          </button>
          <input type="submit" value='Create' className='button-green' />
        </div>
      </form>
    </div>
  )};

export default EmployeeCreationForm;
