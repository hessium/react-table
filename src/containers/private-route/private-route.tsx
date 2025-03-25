import {Navigate} from "react-router-dom";
import {ReactNode} from "react";
import {useAppSelector} from "../../shared/hooks";
import {selectAuthToken} from "../../store/auth-slice.ts";
import { getCookie } from "../../shared/utils/cookies.ts";

export function PrivateRoute({ children }: { children: ReactNode }) {
    const token = useAppSelector(selectAuthToken);
    const isAuth = !!token || !!getCookie('authToken');

    return isAuth ? children : <Navigate to="/login" replace />;
}