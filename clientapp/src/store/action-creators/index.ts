import * as UsersActionCreators from "../../components/Users/actions";
import * as RegionActionCreators from "../../components/Regions/actions";
import * as HotelActionCreators from "../../components/Hotels/actions";
import * as AuthActionCreators from "../../components/Auth/actions";
const actions = {
    ...UsersActionCreators,
    ...RegionActionCreators,
    ...HotelActionCreators,
    ...AuthActionCreators,
}
export default actions;