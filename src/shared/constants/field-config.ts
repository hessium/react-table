import {FieldConfig} from "../types/field.ts";

export const fieldConfigs: FieldConfig[] = [
    {
        name: 'companySignatureName',
        label: 'Company Signature Name',
        type: 'text',
        required: true
    },
    {
        name: 'documentName',
        label: 'Document Name',
        type: 'text',
        required: true
    },
    {
        name: 'documentStatus',
        label: 'Document Status',
        type: 'text',
        required: true,
    },
    {
        name: 'documentType',
        label: 'Document Type',
        type: 'text',
        required: true,
    },
    {
        name: 'employeeNumber',
        label: 'Employee Number',
        type: 'text',
        required: true
    },
    {
        name: 'employeeSignatureName',
        label: 'Employee Signature Name',
        type: 'text',
        required: true
    },
    {
        name: 'employeeSigDate',
        label: 'Employee Sig Date',
        type: 'date',
        required: true
    },
    {
        name: 'companySigDate',
        label: 'Company Sig Date',
        type: 'date',
        required: true
    },
];