import * as UsersActionCreators from "../../components/Users/actions";
import * as RegionActionCreators from "../../components/Regions/actions";
import * as HotelActionCreators from "../../components/Hotels/actions";
const actions = {
    ...UsersActionCreators,
    ...RegionActionCreators,
    ...HotelActionCreators,
}
export default actions;