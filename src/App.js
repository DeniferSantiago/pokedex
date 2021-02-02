import { useState } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Alerts } from "./Components/Alerts";
import { PrivateRoute } from "./Components/PrivateRouter";
import { AlertContext } from "./Helpers/AlertContext";
import { Confirm } from "./Pages/Confirm";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Pages/Login";
import { SignUp } from "./Pages/SignUp";
function App() {
	const [alertData, setAlert] = useState(null);
	return (
		<AlertContext.Provider value={{ alertData, setAlert }}>
			<Router>
				<Switch>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />
					<Route path="/confirm/:userName" component={Confirm} />
					<PrivateRoute path="/">
						<Dashboard />
					</PrivateRoute>
					<PrivateRoute path="*">
						<Dashboard />
					</PrivateRoute>
				</Switch>
			</Router>
			<Alerts />
		</AlertContext.Provider>
	);
}

export default App;
