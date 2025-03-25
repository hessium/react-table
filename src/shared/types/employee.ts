export interface EmployeeItem {
    id: string;
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}

export interface EmployeeState {
    items: EmployeeItem[];
    loading: boolean;
    error: string | null;
}

export interface CreateItemPayload {
    companySigDate: string;
    companySignatureName: string;
    documentName: string;
    documentStatus: string;
    documentType: string;
    employeeNumber: string;
    employeeSigDate: string;
    employeeSignatureName: string;
}

export type FormData = CreateItemPayload