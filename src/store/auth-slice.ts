import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {AuthState} from "../shared/types/auth.ts";
import {RootState} from "./types.ts";
import {cookieOptions, getCookie, removeCookie, setCookie} from "../shared/utils/cookies.ts";



const initialState: AuthState = {
    token: getCookie('authToken'),
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.token = action.payload;
            state.error = null;

            setCookie('authToken', action.payload, cookieOptions);
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.token = null;

            removeCookie('authToken', cookieOptions.path);
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export const selectAuthToken = (state: RootState) => state.auth.token;
export default authSlice.reducer;