import React, { useState } from "react";
import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	Link,
	Grid,
	Box,
	Typography,
	Container,
	makeStyles,
	Icon,
    FormHelperText,
} from "@material-ui/core";
import { allRulesName, Constraint, Rule, Validate } from "../Helpers/Validator";
import { Auth } from "aws-amplify";
import { Copyright } from "../Components/Copyright";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserActions } from "../Actions/UserActions";

const useStyles = makeStyles(theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center"
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary
	},
	form: {
		width: "100%",
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
    }
}));
const constraints = [
    new Constraint("name", [
        new Rule(allRulesName.RangeLength, null, [4, 48]),
        new Rule(allRulesName.OnlyAlphaNumericSpaces)
    ]),
    new Constraint("userName", [
        new Rule(allRulesName.RangeLength, null, [4, 25]),
        new Rule(allRulesName.OnlyAlphaNumeric)
    ]),
    new Constraint("password", [
        new Rule(allRulesName.MinLength, null, [6]),
        new Rule(allRulesName.MinRequiredNumbers, null, [1])
    ]),
    new Constraint("email", [
        new Rule(allRulesName.Email)
    ])
]
export const SignUp = () => {
    const classes = useStyles();
    const [data, setData] = useState({
        name: "",
        userName: "",
        password: "",
        email: ""
    });
    const [errors, setErrors] = useState({
        userName: [],
        name: [],
        password: [],
        email: []
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
    const disabledButton = !data.userName || !data.password || !data.email || hasError;
    const userNameHelper = errors.userName[0]?.message;
    const passwordHelper = errors.password[0]?.message;
    const nameHelper = errors.name[0]?.message;
    const emailHelper = errors.email[0]?.message;
	const history = useHistory();
	const dispatch = useDispatch();
    const SignUp = async event => {
        event.preventDefault();
        try {
            const attributes = { email: data.email, name: data.name };
            await Auth.signUp({
                username: data.userName,
                password: data.password,
                attributes
			});
			dispatch(UserActions.SetLoginData({ userName: data.userName, password: data.password }));
            history.push({ pathname: `/confirm/${data.userName}` });
        } catch (e) {
            console.log(e);
        }
    };
    return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<Icon>lockoutlinedicon</Icon>
				</Avatar>
				<Typography component="h1" variant="h5" color="primary">
					Registrarse
				</Typography>
				<form className={classes.form} method="post" onSubmit={SignUp} noValidate onChange={FormChange}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								autoComplete="name"
								name="name"
								variant="outlined"
								required
								fullWidth
								id="name"
								label="Nombre"
								autoFocus
							/>
                            <FormHelperText error>{nameHelper}</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<TextField
								autoComplete="username"
								name="userName"
								variant="outlined"
								required
								fullWidth
								id="userName"
								label="Nombre de Usuario"
							/>
                            <FormHelperText error>{userNameHelper}</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Correo electrónico"
								name="email"
								autoComplete="email"
							/>
                            <FormHelperText error>{emailHelper}</FormHelperText>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Contraseña"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
                            <FormHelperText error>{passwordHelper}</FormHelperText>
						</Grid>
					</Grid>
					<Button
						type="submit"
                        fullWidth
                        disabled={disabledButton}
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Registrarse
					</Button>
                    <Link href="/login" variant="body2">
                        ¿Tienes una cuenta? Inicia Sesión
                    </Link>
				</form>
			</div>
			<Box mt={5}>
				<Copyright />
			</Box>
		</Container>
	);
};
