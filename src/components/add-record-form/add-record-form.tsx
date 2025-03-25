import {FormEvent, useState, useEffect, ChangeEvent} from 'react';
import {
    Box,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    CircularProgress, SelectChangeEvent
} from '@mui/material';
import {FormData} from '../../shared/types/employee';
import {fieldConfigs} from "../../shared/constants/field-config.ts";
import {FieldConfig} from "../../shared/types/field.ts";

interface FormProps {
    onSubmit: (data: FormData) => Promise<void>;
    onCancel: () => void;
    initialData?: Partial<FormData>;
    isSubmitting: boolean;
}

export const AddRecordForm = (
    {
        onSubmit,
        onCancel,
        initialData,
        isSubmitting
    }: FormProps) => {

    const [formData, setFormData] = useState<FormData>({
        companySignatureName: '',
        documentName: '',
        documentStatus: '',
        documentType: '',
        employeeNumber: '',
        employeeSignatureName: '',
        employeeSigDate: '',
        companySigDate: ''
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData,
            }));
        }
    }, [initialData]);

    const validateForm = (): boolean => {
        const newErrors = fieldConfigs.reduce((acc, field) => {
            if (field.required) {
                if (field.type === 'date' && !formData[field.name]) {
                    acc[field.name] = 'Required';
                } else if (!formData[field.name]?.trim()) {
                    acc[field.name] = 'Required';
                }
            }
            return acc;
        }, {} as Partial<FormData>);

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: ''}));
    };

    const handleSelectChange = (e: SelectChangeEvent) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
        setErrors(prev => ({...prev, [name]: ''}));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await onSubmit(formData);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    };

    const renderField = (config: FieldConfig) => {
        if (config.type === 'select') {
            return (
                <FormControl
                    key={config.name}
                    fullWidth
                    error={!!errors[config.name]}
                >
                    <InputLabel>{config.label} *</InputLabel>
                    <Select
                        name={config.name}
                        value={formData[config.name]}
                        label={`${config.label} *`}
                        onChange={handleSelectChange}
                    >
                        {config.options?.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                    {errors[config.name] && (
                        <FormHelperText>{errors[config.name]}</FormHelperText>
                    )}
                </FormControl>
            );
        }

        if (config.type === 'date') {
            return (
                <TextField
                    key={config.name}
                    fullWidth
                    label={config.label}
                    name={config.name}
                    type="date"
                    value={formData[config.name].split('T')[0]}
                    onChange={handleChange}
                    error={!!errors[config.name]}
                    helperText={errors[config.name]}
                    required={config.required}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                        pattern: '\\d{4}-\\d{2}-\\d{2}',
                    }}
                />
            );
        }

        return (
            <TextField
                key={config.name}
                fullWidth
                label={config.label}
                name={config.name}
                value={formData[config.name]}
                onChange={handleChange}
                error={!!errors[config.name]}
                helperText={errors[config.name]}
                required={config.required}
            />
        );
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{display: 'flex', flexDirection: 'column', gap: 3}}
        >
            {fieldConfigs.map(renderField)}

            <Box sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: 2,
                mt: 2
            }}>
                <Button
                    variant="outlined"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <CircularProgress size={24}/> : 'Save'}
                </Button>
            </Box>
        </Box>

    );
};