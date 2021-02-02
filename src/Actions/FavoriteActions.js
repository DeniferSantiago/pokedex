import { setFavorite } from "./ActionsTypes"
const SetFavorite = (user, val) => {
    return { type: setFavorite, data: { user, val } };
};
export const FavoriteActions = {
    SetFavorite
};