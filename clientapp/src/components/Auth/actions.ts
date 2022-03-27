import axios, { AxiosError } from "axios";
import { Dispatch } from "react"
import http from "../../http_comon"
import jwt_decode from "jwt-decode";
import { AuthAction, AuthActionTypes, ILoginModel, IRegisterModel, IUser, IUserResponse } from "./types";

export const LoginUser = (data: ILoginModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            let response = await http.post<IUserResponse>('api/auth/login', data)
            const { token } = response.data;
            localStorage.token = token;
            AuthUser(token, dispatch);
            return Promise.resolve();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                if (serverError && serverError.request.status) {
                    return Promise.reject(serverError.request.status);
                }
            }
            return Promise.reject(error)
        }
    }
}

export const RegisterUser = (data: IRegisterModel) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            let response = await http.post<IUserResponse>('api/auth/register', data)
            const { token } = response.data;
            localStorage.token = token;

            AuthUser(token, dispatch)
            return Promise.resolve();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError<any>;
                if (serverError && serverError.request.response) {
                    return Promise.reject(serverError.request.response);
                }
            }
            return Promise.reject(error)
        }
    }
}
export const LogoutUser = () => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            localStorage.removeItem("token");
            dispatch({
                type: AuthActionTypes.AUTH_LOGOUT,
            })
            return Promise.resolve();
        }
        catch (ex) {
            return Promise.reject(ex)
        }
    }
}
export const AuthUser = (token: string, dispatch: Dispatch<AuthAction>) => {
    const user = jwt_decode(token) as IUser;
    dispatch({
        type: AuthActionTypes.AUTH_SUCCESS,
        payload: { id: user.id, fullName: user.fullName, username: user.username }
    })
}