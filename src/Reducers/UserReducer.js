import { onLogout, setLoginData, setUser } from "../Actions/ActionsTypes";
import { lsKeys } from "../Helpers/lsKeys";
const initUser = sessionStorage.getItem(lsKeys.user);
const initialState = {
    user: JSON.parse(initUser),
    loginData: null
}
export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case setUser:
            return {...state, user: action.user};
        case setLoginData:
            return {...state, loginData: action.loginData};
        case onLogout: 
            return { ...initialState };
        default:
            return state;
    }
}