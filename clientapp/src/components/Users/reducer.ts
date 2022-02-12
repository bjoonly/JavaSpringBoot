import { UsersActionTypes, UserState, UserAction } from "./types";

const initialState: UserState = {
    users: [],
    totalPages: 0
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UsersActionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload.content,
                totalPages: action.payload.totalPages
            }
        default:
            return state;
    }
}