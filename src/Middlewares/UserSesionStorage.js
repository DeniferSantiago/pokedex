import { onLogout, setUser } from "../Actions/ActionsTypes";
import { lsKeys } from "../Helpers/lsKeys";

export const UserSesionStorage = store => next => action => {
    const result = next(action);
    if(action.type === setUser) {
        const newValue = JSON.stringify(action.user);
        sessionStorage.setItem(lsKeys.user, newValue);
    } else if(action.type === onLogout) {
        sessionStorage.removeItem(lsKeys.user);
    }
    return result;
};
