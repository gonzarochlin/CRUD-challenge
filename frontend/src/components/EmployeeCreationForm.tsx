import React, { useState, useEffect } from 'react';
import { IDepartment, IEmployee, } from '../types/types';
import { getAllDepartments } from '../services/api';

interface EmployeeCreationFormProps {
  onClose: () => void;
  onCreateEmployee: (employee: IEmployee) => void; 
}

const EmployeeCreationForm = (props: EmployeeCreationFormProps): JSX.Element => {
  const { onClose, onCreateEmployee } = props;

  const [departments, setDepartments] = useState<IDepartment[]>([]);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [hireDate, setHireDate] = useState(new Date().toISOString().substring(0,10));
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(null);

  // Fetch employee details and department list
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentsRes = await getAllDepartments();
        setDepartments(departmentsRes.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };

    fetchDepartments();
  }, []);

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

  const handleCreate = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!selectedDepartment) return;

    const employeeToCreate: IEmployee = {
      firstName,
      lastName,
      hireDate,
      phone,
      address,
      departmentId: selectedDepartment,
      department: departments.filter(dept => dept.id === selectedDepartment)[0],
    };

    console.log(departments, selectedDepartment)

    onCreateEmployee(employeeToCreate);
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
              {departments.map((dept) => (
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
