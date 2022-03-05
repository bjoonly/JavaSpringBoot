import { combineReducers } from "redux";
import { hotelReducer } from "../../components/Hotels/reducer";
import { userReducer } from "../../components/Users/reducer";

export const rootReducer = combineReducers({
    users: userReducer,
    hotel: hotelReducer,
});

export type RootState = ReturnType<typeof rootReducer>;