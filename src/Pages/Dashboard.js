import { AppBar, Button, Icon, IconButton, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import { UserActions } from "../Actions/UserActions";
import { Home } from "./Home";
import { Pokemon } from "./Pokemon";
const getStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1
    },
    title: {
        flexGrow: 1
    },
    homeButton: {
        marginRight: 5
    }
}));
export const Dashboard = () => {
    const classes = getStyles();
	const toHome = () => {
		history.push({ pathname: "/" });
    };
    const [loadingSignOut, setLoadingSignOut] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const SignOut = async () => {
        setLoadingSignOut(true);
        try {
            await Auth.signOut();
            dispatch(UserActions.OnLogout());
            history.replace({ pathname: "/login" });
        } catch (e) {
            console.log(e);
        }
        setLoadingSignOut(false);
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <IconButton color="secondary" className={classes.homeButton} onClick={toHome}>
                        <Icon>home</Icon>
                    </IconButton>
                    <Typography color="secondary" variant="h6" className={classes.title}>Pokedex</Typography>
                    <Button disabled={loadingSignOut} onClick={SignOut} color="secondary">Cerrar Sesión</Button>
                </Toolbar>
            </AppBar>
            <Switch>
                <Route path="/pokemon/:name" component={Pokemon} />
                <Route path="/" component={Home} />
            </Switch>
        </div>
    );
};
