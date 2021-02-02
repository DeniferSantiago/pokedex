import { onLogout, setLoginData, setUser } from "./ActionsTypes";

const SetUser = user => {
    return { type: setUser, user };
};
const SetLoginData = loginData => {
    return { type: setLoginData, loginData };
};
const OnLogout = () => {
    return { type: onLogout };
};
export const UserActions = {
    SetUser,
    OnLogout,
    SetLoginData
};