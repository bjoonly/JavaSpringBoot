export enum HotelsActionTypes {
    ADD_HOTEL = "ADD_HOTEL",
    UPLOAD_IMAGE = "UPLOAD_IMAGE"
}

export interface IHotel {
    name: string,
    description: string,
    images: Array<string>
}

export interface IHotelResponse {
    data: IHotel,
}


export interface AddHotelAction {
    type: HotelsActionTypes.ADD_HOTEL,
    payload: IHotelResponse
}

export interface UploadImageAction {
    type: HotelsActionTypes.UPLOAD_IMAGE,
    payload: string
}

export type HotelAction = AddHotelAction | UploadImageAction;