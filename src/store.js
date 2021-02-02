import { applyMiddleware, createStore } from "redux";
import { UserSesionStorage } from "./Middlewares/UserSesionStorage";
import reducers from "./Reducers/index";
export const store = createStore(
    reducers,
    applyMiddleware(UserSesionStorage)
);