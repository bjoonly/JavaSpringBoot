import { AuthAction, AuthActionTypes, AuthState } from "./types";

const initialState: AuthState = {
    user: {
        id: "",
        fullName: "",
        username: "",
    },
    isAuth: false,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AuthActionTypes.AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        case AuthActionTypes.AUTH_LOGOUT:
            return {
                ...state,
                user: {
                    id: "",
                    fullName: "",
                    username: "",
                },
                isAuth: false
            }
        default:
            return state;
    }
}