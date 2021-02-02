import { combineReducers } from "redux"
import { UserReducer } from "./UserReducer";
import { FavoriteReducer } from "./FavoriteReducer";
const reducers = combineReducers({
    UserReducer,
    FavoriteReducer
});
export default reducers;