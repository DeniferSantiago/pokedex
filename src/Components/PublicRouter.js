import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
/**
 * @param {RouteProps} param0 
 */
export function PublicRoute({ children, ...rest }) {
    let user = useSelector(state => state.UserReducer.user);
    return (
      <Route
        {...rest}
        render={() =>
          !user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/"
              }}
            />
          )
        }
      />
    );
}