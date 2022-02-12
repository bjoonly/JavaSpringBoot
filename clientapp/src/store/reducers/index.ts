import { combineReducers } from "redux";
import { userReducer } from "../../components/Users/reducer";

export const rootReducer = combineReducers({
    users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;