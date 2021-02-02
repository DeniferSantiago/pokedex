import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
/**
 * @param {RouteProps} param0 
 */
export function PrivateRoute({ children, ...rest }) {
    let user = useSelector(state => state.UserReducer.user);
    return (
      <Route
        {...rest}
        render={({ location }) =>
          user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
}