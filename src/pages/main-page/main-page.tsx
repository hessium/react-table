import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Box, Button, Container, Snackbar} from '@mui/material';
import {CreateItemPayload, EmployeeItem} from '../../shared/types/employee';
import {createItem, deleteItem, fetchData, updateItem} from "../../store/employee-slice.ts";
import {EmployeeTable} from "../../components/employee-table/employee-table.tsx";
import {Modal} from '../../shared/UI/modal/modal.tsx';
import {AddRecordForm} from "../../components/add-record-form/add-record-form.tsx";
import {AppDispatch} from "../../store/store.ts";
import {RootState} from "../../store/types.ts";
import {Loader} from "../../shared/UI/spinner/loader.tsx";


export function MainPage() {
    const dispatch = useDispatch<AppDispatch>();
    const {items, loading, error} = useSelector((state: RootState) => state.data);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<EmployeeItem | null>(null);
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        isError: false
    });

    const fetchDataWithLoading = useCallback(async () => {
        try {
            await dispatch(fetchData()).unwrap();
        } catch (error) {
            setSnackbarState({
                open: true,
                message: `Ошибка ${error}`,
                isError: true
            });
        }
    }, [dispatch]);

    useEffect(() => {
        fetchDataWithLoading();
    }, [fetchDataWithLoading]);

    const handleSubmit = async (formData: CreateItemPayload) => {
        setFormSubmitting(true);
        try {
            const payload = {
                ...formData,
                companySigDate: formData.companySigDate
                    ? new Date(formData.companySigDate).toISOString()
                    : new Date().toISOString(),
                employeeSigDate: formData.employeeSigDate
                    ? new Date(formData.employeeSigDate).toISOString()
                    : new Date().toISOString()
            };

            if (editingItem?.id) {
                await dispatch(updateItem({id: editingItem.id, data: payload}));
            } else {
                await dispatch(createItem(payload));
            }

            setSnackbarState({open: true, message: `Запись ${editingItem ? 'обновлена' : 'создана'}`, isError: false});

            if (!editingItem) {
                await fetchDataWithLoading();
            }

            setModalOpen(false);
        } catch (error) {
            setSnackbarState({open: true, message: `Ошибка ${error}`, isError: true});
        } finally {
            setFormSubmitting(false);
        }
    };

    const handleOpenModal = (item: EmployeeItem | null = null) => {
        setEditingItem(item);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            await dispatch(deleteItem(id)).unwrap();
            setSnackbarState({
                open: true,
                message: 'Запись удалена',
                isError: false
            });
        } catch (error) {
            setSnackbarState({
                open: true,
                message: `Ошибка ${error}`,
                isError: true
            });
        }
    };

    return (
        <Container>
            <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
                <Button
                    variant="contained"
                    onClick={() => {
                        setEditingItem(null);
                        setModalOpen(true);
                    }}
                >
                    Добавить запись
                </Button>

                <Button
                    variant="outlined"
                    onClick={() => {
                    }}
                >
                    Выйти
                </Button>
            </Box>

            {loading ? (
                <Loader/>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <EmployeeTable
                    data={items}
                    onEdit={(item) => handleOpenModal(item)}
                    onDelete={handleDelete}
                />
            )}

            <Modal
                isOpen={modalOpen}
                showActions={false}
                onClose={() => setModalOpen(false)}
                title={editingItem ? 'Редоктирование записи' : 'Новая запись'}
                children={
                    <AddRecordForm
                        initialData={editingItem || undefined}
                        onCancel={() => setModalOpen(false)}
                        onSubmit={handleSubmit}
                        isSubmitting={formSubmitting}
                    />
                }
            />

            <Snackbar
                open={snackbarState.open}
                autoHideDuration={3000}
                onClose={() => setSnackbarState(prev => ({...prev, open: false}))}
                message={snackbarState.message}
            />
        </Container>
    );
}