import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './auth-slice.ts';
import employeeSlice from './employee-slice.ts';

export const rootReducer = combineReducers({
    auth: authReducer,
    data: employeeSlice,
});

export type RootState = ReturnType<typeof rootReducer>;