export enum AuthActionTypes {
    AUTH_SUCCESS = "AUTH_SUCCESS",
    AUTH_LOGOUT = "AUTH_LOGOUT",
}
export interface IRegisterModel {
    fullName: string,
    email: string,
    password: string,
    reCaptchaToken: string
}

export interface ILoginModel {
    email: string,
    password: string
}

export interface IUser {
    id: string | number,
    fullName: string,
    username: string,
}
export interface IUserResponse {
    id: string | number,
    fullName: string,
    username: string,
    token: string
}
export interface AuthState {
    user: IUser,
    isAuth: boolean,
}

export interface AuthSuccessAction {
    type: AuthActionTypes.AUTH_SUCCESS,
    payload: IUser
}

export interface AuthLogout {
    type: AuthActionTypes.AUTH_LOGOUT
}

export type AuthAction = AuthSuccessAction | AuthLogout;