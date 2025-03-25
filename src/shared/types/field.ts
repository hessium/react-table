import {FormData} from "./employee.ts";

export type FieldConfig = {
    name: keyof FormData;
    label: string;
    type: 'text' | 'date' | 'select';
    required?: boolean;
    options?: { value: string; label: string }[];
};