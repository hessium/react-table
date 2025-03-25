import {FormEvent, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {TextField, Button, Container, Typography, Snackbar} from '@mui/material';
import { api } from '../../api/apiClient';
import {loginFailure, loginStart, loginSuccess} from "../../store/auth-slice.ts";
import {cookieOptions, setCookie} from "../../shared/utils/cookies.ts";

export function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        isError: false
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await api.post('/ru/data/v3/testmethods/docs/login', { username, password });
            const token = response.data.data.token;

            setCookie('authToken', token, cookieOptions);

            dispatch(loginSuccess(token));
            setSnackbarState({open: true, message: `Авторизация успешна`, isError: false});
            navigate('/');
        } catch (error) {
            dispatch(loginFailure('Invalid credentials: ' + error));
            setSnackbarState({open: true, message: `Ошибка авторизации`, isError: false});
        }
    };

    return (
        <Container maxWidth="xs">
            <Typography variant="h4" gutterBottom>
                Login
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>


            <Snackbar
                open={snackbarState.open}
                autoHideDuration={3000}
                onClose={() => setSnackbarState(prev => ({...prev, open: false}))}
                message={snackbarState.message}
            />
        </Container>
    );
}