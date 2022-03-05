export enum HotelsActionTypes {
    ADD_HOTEL = "ADD_HOTEL",
    UPLOAD_IMAGE = "UPLOAD_IMAGE",
    GET_HOTEL_LIST = "GET_HOTEL_LIST",
    GET_HOTEL = "GET_HOTEL",
    EDIT_HOTEL = "EDIT_HOTEL",
    DELETE_HOTEL = "DELETE_HOTEL"
}
export interface HotelState {
    selectedHotel: IHotelItem,
    hotels: Array<IHotelItem>,
    totalPages: number
}
export interface IHotel {
    name: string,
    description: string,
    images: Array<string>
}

export interface IHotelResponse {
    data: IHotel,
}
export interface IHotelItemResponse {
    data: IHotelItem,
}
export interface IHotelListResponse {
    content: Array<IHotelItem>,
    totalPages: number
}

export interface IHotelItem {
    id: number,
    name: string,
    description: string,
    images: Array<IHotelImageItem>
}
export interface IHotelImageItem {
    name: string,
}

export interface AddHotelAction {
    type: HotelsActionTypes.ADD_HOTEL,
    payload: IHotel
}

export interface UploadImageAction {
    type: HotelsActionTypes.UPLOAD_IMAGE,
    payload: string
}

export interface EditHotelAction {
    type: HotelsActionTypes.EDIT_HOTEL,
    payload: string
}

export interface GetListAction {
    type: HotelsActionTypes.GET_HOTEL_LIST,
    payload: IHotelListResponse
}

export interface GetHotelAction {
    type: HotelsActionTypes.GET_HOTEL,
    payload: IHotelItem
}

export interface DeleteHotelAction {
    type: HotelsActionTypes.DELETE_HOTEL,
    payload: string
}

export type HotelAction = AddHotelAction | UploadImageAction | EditHotelAction | GetListAction | GetHotelAction | DeleteHotelAction;