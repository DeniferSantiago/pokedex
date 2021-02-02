import { setFavorite } from "../Actions/ActionsTypes";
import { lsKeys } from "../Helpers/lsKeys";
const initFav = localStorage.getItem(lsKeys.favorites);
const initialState = {
    favorites: JSON.parse(initFav) ?? {}
};
export const FavoriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case setFavorite: {
            const { user, val } = action.data;
            const favs = {...state.favorites};
            const userFav = favs[user] ?? [];
            const i = userFav?.findIndex(f => f.id === val.id);
            if(i !== -1) {
                userFav[i] = val;
            } else {
                userFav.push(val);
            }
            favs[user] = userFav;
            localStorage.setItem(lsKeys.favorites, JSON.stringify(favs));
            return { ...state, favorites: favs };
        }
        default:
            return state;
    }
};