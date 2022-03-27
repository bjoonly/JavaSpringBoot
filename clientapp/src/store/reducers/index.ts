import { combineReducers } from "redux";
import { hotelReducer } from "../../components/Hotels/reducer";
import { userReducer } from "../../components/Users/reducer";
import { authReducer } from "../../components/Auth/reducer";

export const rootReducer = combineReducers({
    users: userReducer,
    hotel: hotelReducer,
    auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;