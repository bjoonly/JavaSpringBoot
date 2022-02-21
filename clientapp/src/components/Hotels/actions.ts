import { IHotelResponse, HotelAction, HotelsActionTypes, IHotel } from "./types";
import { Dispatch } from "react"
import http from "../../http_comon"
import axios, { AxiosError } from "axios"

export const UploadImage = (image: string) => {
    return async (dispatch: Dispatch<HotelAction>) => {
        try {
            let response = await http.post<string>(`/upload`, { base64: image })
            dispatch({
                type: HotelsActionTypes.UPLOAD_IMAGE,
                payload: response.data
            })
            return Promise.resolve(response.data);
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

export const AddHotel = (hotel: IHotel) => {
    return async (dispatch: Dispatch<HotelAction>) => {
        try {
            console.log(hotel)
            let response = await http.post<IHotelResponse>(`api/hotel/add`, hotel)
            dispatch({
                type: HotelsActionTypes.ADD_HOTEL,
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