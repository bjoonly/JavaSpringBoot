import { IHotelResponse, HotelAction, HotelsActionTypes, IHotel, IHotelItemResponse, IHotelListResponse, IHotelItem } from "./types";
import { Dispatch } from "react"
import http from "../../http_comon"
import axios, { AxiosError } from "axios"
import qs from "qs"


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
            let response = await http.post<IHotelResponse>(`api/hotel/add`, hotel)
            dispatch({
                type: HotelsActionTypes.ADD_HOTEL,
                payload: response.data.data
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

export const EditHotel = (id: number | string, hotel: IHotel, removedImages: Array<string> | null) => {
    return async (dispatch: Dispatch<HotelAction>) => {
        try {
            let response = await http.put<string>(`api/hotel/edit/${id}`,
                {
                    name: hotel.name,
                    description: hotel.description,
                    removedImages: removedImages,
                    images: hotel.images
                })
            dispatch({
                type: HotelsActionTypes.EDIT_HOTEL,
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

export const GetHotel = (id: number | string) => {
    return async (dispatch: Dispatch<HotelAction>) => {
        try {
            let response = await http.get<IHotelItem>(`api/hotel/get-by-id/${id}`)
            console.log(response.data)
            dispatch({
                type: HotelsActionTypes.GET_HOTEL,
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

export const GetHotels = (page: number) => {
    return async (dispatch: Dispatch<HotelAction>) => {
        try {
            page -= 1;
            let response = await http.get<IHotelListResponse>(`api/hotel/get`, {
                params: {
                    page: page
                },
                paramsSerializer: params => {
                    return qs.stringify({ ...params }, { allowDots: true })
                }
            });

            dispatch({
                type: HotelsActionTypes.GET_HOTEL_LIST,
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

export const DeleteHotel = (id: number) => {
    return async () => {
        try {
            await http.delete(`api/hotel/delete/${id}`);
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