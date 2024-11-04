import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IDepartment, IEmployee } from '../../types/types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:80';

export const employeeApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    tagTypes: ['Employee', 'Department'],
    endpoints: (builder) => ({
        getAllEmployees: builder.query<IEmployee[], void>({
            query: () => '/employees',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Employee' as const, id })), { type: 'Employee', id: 'LIST' }]
                    : [{ type: 'Employee', id: 'LIST' }],
        }),
        getAllDepartments: builder.query<IDepartment[], void>({
            query: () => '/departments',
            providesTags: (result) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Department' as const, id })), { type: 'Department', id: 'LIST' }]
                    : [{ type: 'Department', id: 'LIST' }],
        }),
        getEmployeeById: builder.query<IEmployee, number>({
            query: (id) => `/employees/${id}`,
            providesTags: (result, error, id) => [{ type: 'Employee', id }],
        }),
        createEmployee: builder.mutation<void, Partial<IEmployee>>({
            query: (employee) => ({
                url: '/employees',
                method: 'POST',
                body: employee,
            }),
            invalidatesTags: [{ type: 'Employee', id: 'LIST' }], // Will refetch employees list
        }),
        updateEmployee: builder.mutation<void, { id: number; data: Partial<IEmployee> }>({
            query: ({ id, data }) => ({
                url: `/employees/${id}`,
                method: 'PUT',
                body: data,
            }),
            // Invalidate the specific employee ID and the 'LIST' tag
            invalidatesTags: (result, error, { id }) => [{ type: 'Employee', id }, { type: 'Employee', id: 'LIST' }],
        }),
        deleteEmployee: builder.mutation<void, number>({
            query: (id) => ({
                url: `/employees/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Employee', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetAllEmployeesQuery,
    useGetAllDepartmentsQuery,
    useGetEmployeeByIdQuery,
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeeApi;
