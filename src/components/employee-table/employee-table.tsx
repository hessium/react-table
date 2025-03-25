import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

import {EmployeeItem} from "../../shared/types/employee.ts";


interface DataTableProps {
    data: EmployeeItem[];
    onEdit: (item: EmployeeItem) => void;
    onDelete: (id: string) => void;
}

export function EmployeeTable({ data, onEdit, onDelete }: DataTableProps) {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Document Name</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.documentName}</TableCell>
                            <TableCell>{item.documentStatus}</TableCell>
                            <TableCell>{item.documentType}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(item)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => onDelete(item.id)}>
                                    <Delete />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}