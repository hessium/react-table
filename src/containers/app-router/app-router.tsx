import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {LoginPage} from "../../pages/login-page/login-page.tsx";
import {MainPage} from "../../pages/main-page/main-page.tsx";
import {PrivateRoute} from "../private-route/private-route.tsx";

export function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <MainPage />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    )
}