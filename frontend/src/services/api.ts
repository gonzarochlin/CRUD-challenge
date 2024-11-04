import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Employee API functions
export const getAllEmployees = async () => {
    return axios.get(`${API_BASE_URL}/employees`);
};

export const getEmployeeById = async (id: number) => {
    return axios.get(`${API_BASE_URL}/employees/${id}`);
};

export const createEmployee = async (employeeData: any) => {
    const data = JSON.stringify(employeeData); 
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${API_BASE_URL}/employees/`,
        headers: { 
            'Content-Type': 'application/json'
        },
        data,
    };
    return await axios.request(config);
};

export const updateEmployee = async (id: number, updateData: any) => {
    return axios.put(`${API_BASE_URL}/employees/${id}`, updateData);
};

export const deleteEmployee = async (id: number) => {
    return axios.delete(`${API_BASE_URL}/employees/${id}`);
};

// Department API functions
export const getAllDepartments = async () => {
    return axios.get(`${API_BASE_URL}/departments`);
};
