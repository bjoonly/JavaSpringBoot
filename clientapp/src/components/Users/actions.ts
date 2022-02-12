import { Dispatch } from "react"
import { UsersActionTypes, UserState, UserAction, ISearch, IUsersResponse } from "./types";
import http from "../../http_comon"
import axios, { AxiosError } from "axios"
import qs from "qs"

export const GetUsers = (page: number, count: number) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            page -= 1;
            let response = await http.get<IUsersResponse>(`api/users/get`, {
                params: {
                    page: page,
                    count: count
                },
                paramsSerializer: params => {
                    return qs.stringify({ ...params }, { allowDots: true })
                }
            })
            dispatch({
                type: UsersActionTypes.GET_USERS,
                payload: response.data
            })
            return Promise.resolve();
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                const serverError = error as AxiosError;
                if (serverError && serverError.response) {
                    serverError.response.data.status = serverError.response.status;
                    return Promise.reject(serverError.response.data);
                }
            }
            return Promise.reject(error)
        }
    }
}