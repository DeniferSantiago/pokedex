import React, { useState } from 'react'
import CodeInput from 'react-verification-code-input';
import { Avatar, Box, Container, CssBaseline, Icon, makeStyles, Typography } from '@material-ui/core'
import { Auth } from 'aws-amplify';
import { useHistory, useParams } from 'react-router-dom';
import { Copyright } from '../Components/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from '../Actions/UserActions';
const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary,
    },
    codeInput: {
        marginTop: theme.spacing(3)
    }
}));
export const Confirm = () => {
    const classes = useStyles();
    const { userName } = useParams();
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const loginData = useSelector(state => state.UserReducer.loginData);
    const OnConfirm = async code => {
        setLoading(true);
        try {
            await Auth.confirmSignUp(userName, code);
            if(loginData){
                const user = await Auth.signIn(loginData.userName, loginData.password);
                console.log(user);
                dispatch(UserActions.SetLoginData(null));
                dispatch(UserActions.SetUser(user));
                history.replace({ pathname: "/" });
            } else {
                history.replace({ pathname: "/login" });
            }
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }
    return (
        <Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<Icon>checkcircleoutline</Icon>
				</Avatar>
				<Typography component="h1" variant="h5" color="primary">
					Confirmar Cuenta
				</Typography>
				<CodeInput loading={loading} disabled={loading} className={classes.codeInput} title="Ingresa el código enviado a tu correo" onComplete={OnConfirm} fields={6} type="text" />
                <Box mt={5}>
                    <Copyright />
                </Box>
			</div>
		</Container>
    )
}
