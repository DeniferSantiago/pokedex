import React, { useContext, useState } from "react";
import {
	Avatar,
	Button,
	TextField,
	Link,
	Box,
	CssBaseline,
	Container,
	Typography,
	makeStyles,
	Icon,
    FormHelperText
} from "@material-ui/core";
import { allRulesName, Constraint, Rule, Validate } from "../Helpers/Validator";
import { Auth } from "aws-amplify";
import { Copyright } from "../Components/Copyright";
import { useDispatch } from "react-redux";
import { UserActions } from "../Actions/UserActions";
import { useHistory } from "react-router-dom";
import { AlertContext } from "../Helpers/AlertContext";
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
	form: {
		width: "100%",
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));
const constraints = [
    new Constraint("userName", [
        new Rule(allRulesName.RangeLength, null, [4, 25]),
        new Rule(allRulesName.OnlyAlphaNumeric)
    ]),
    new Constraint("password", [
        new Rule(allRulesName.MinLength, null, [6]),
        new Rule(allRulesName.MinRequiredNumbers, null, [1])
    ])
]
export const Login = () => {
    const classes = useStyles();
    const [data, setData] = useState({
        userName: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        userName: [],
        password: []
    });
    const FormChange = event => {
        const val = event.target.value;
        const key = event.target.name;
        setData( d => ({ ...d, [key]: val }));
        const constraint = constraints.find(c => c.name === key);
        if (val && constraint) {
            let result = Validate(val, constraint, false);
            result = result === true ? [] : result;
            setErrors({ ...errors, [key]: result });
        }
    };
    const errorKeys = Object.keys(errors);
    const hasError = errorKeys.some(key => errors[key].length);
    const disabledButton = !data.userName || !data.password || hasError;
    const userNameHelper = errors.userName[0]?.message;
	const passwordHelper = errors.password[0]?.message;
	const dispatch = useDispatch();
	const history = useHistory();
	const alerts = useContext(AlertContext);
    const SignIn = async event => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await Auth.signIn(
                data.userName,
                data.password
			);
			const user = { userName: response.username, ...response.attributes };
			dispatch(UserActions.SetUser(user));
			history.replace({ pathname: "/" });
        } catch (e) {
			if(e.code === "UserNotConfirmedException"){
				alerts.setAlert({ 
					message: e.message, 
					code: 0, 
					callback: () => {
						dispatch(UserActions.SetLoginData({ userName: data.userName, password: data.password }));
						history.push({ pathname: `/confirm/${data.userName}`})
					} 
				});
			} else if(e.code === "UserNotFoundException" || e.code === "NotAuthorizedException")
				alerts.setAlert({ message: e.message, code: 0 });
			else console.log(e);
        }
        setLoading(false);
    }
    return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<Icon>lockoutlinedicon</Icon>
				</Avatar>
				<Typography component="h1" variant="h5" color="primary">
					Iniciar Sesión
				</Typography>
				<form className={classes.form} onSubmit={SignIn} onChange={FormChange} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="userName"
						label="Nombre de usuario"
						name="userName"
						autoComplete="username"
						autoFocus
					/>
                    <FormHelperText error>{userNameHelper}</FormHelperText>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Contraseña"
						type="password"
						id="password"
						autoComplete="current-password"
					/>
                    <FormHelperText error>{passwordHelper}</FormHelperText>
					<Button
						type="submit"
						fullWidth
						variant="contained"
                        color="primary"
                        disabled={disabledButton || loading}
						className={classes.submit}
					>
						Iniciar Sesión
					</Button>
					<Link href="/signup" variant="body2">
						¿No tienes una cuenta? Registrate
					</Link>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
};
