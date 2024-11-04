export interface IEmployee {
    id?: number;
    firstName: string;
    lastName: string;
    department: IDepartment;
    hireDate: string;
    phone: string;
    address: string;
    departmentId?: number;
    isActive: boolean;
}

export interface IDepartment {
    id: number;
    name: string;
}

export interface IEmployeeProps {
    employee: IEmployee;
    onDeleteEmployee: (id: number) => void;
    onClickDetails: (id: number) => void;
}
