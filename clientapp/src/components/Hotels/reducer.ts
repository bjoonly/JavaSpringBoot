import { HotelsActionTypes, HotelAction, HotelState } from "./types";

const initialState: HotelState = {
    hotels: [],
    selectedHotel: {
        id: 0,
        name: "",
        description: "",
        images: []
    },
    totalPages: 0
}

export const hotelReducer = (state = initialState, action: HotelAction): HotelState => {
    switch (action.type) {
        case HotelsActionTypes.GET_HOTEL_LIST:
            return {
                ...state,
                hotels: action.payload.content,
                totalPages: action.payload.totalPages,
            }
        case HotelsActionTypes.GET_HOTEL:
            return {
                ...state,
                selectedHotel: action.payload
            }
        default:
            return state;
    }
}