import { IRegion, IRegionResponse, RegionActions, RegionsActionTypes } from "./types";
import { Dispatch } from "react"
import http from "../../http_comon"
import axios, { AxiosError } from "axios"

export const AddRegion = (region: IRegion) => {
    return async (dispatch: Dispatch<RegionActions>) => {
        try {
            console.log(region)
            let response = await http.post<IRegionResponse>(`api/region/add`, { name: region.name, image: region.base64 })
            dispatch({
                type: RegionsActionTypes.ADD_REGION,
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


