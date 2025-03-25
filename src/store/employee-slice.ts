import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {CreateItemPayload, EmployeeItem, EmployeeState} from '../shared/types/employee';
import {api} from "../api/apiClient.ts";



const initialState: EmployeeState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchData = createAsyncThunk<EmployeeItem[]>(
    'data/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/ru/data/v3/testmethods/docs/userdocs/get');
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to load data');
        }
    }
);

export const createItem = createAsyncThunk<EmployeeItem, CreateItemPayload>(
    'data/create',
    async (item, { rejectWithValue }) => {
        try {
            const response = await api.post('/ru/data/v3/testmethods/docs/userdocs/create', item);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to create item');
        }
    }
);

export const updateItem = createAsyncThunk<EmployeeItem, { id: string; data: CreateItemPayload }>(
    'data/update',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to update item');
        }
    }
);

export const deleteItem = createAsyncThunk<string, string>(
    'data/delete',
    async (id, { rejectWithValue }) => {
        try {
            await api.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`);
            return id;
        } catch (error) {
            return rejectWithValue(error || 'Failed to delete item');
        }
    }
);

const employeeSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(createItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) state.items[index] = action.payload;
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default employeeSlice.reducer;