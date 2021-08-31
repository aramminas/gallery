import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, CssBaseline, TextField, Grid, Box, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from "react-toast-notifications";
import {errorMessage} from "../../helpers/helpers";

/* actions */
import {signInUser} from "../../store/actions/authAction";

/* components */
import Copyright from "../general/Copyright";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initError = {email: false, password: false};

const SignIn = () => {
    const {addToast} = useToasts();
    const history = useHistory();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(initError);
    const {isAuth} = useSelector(state => state.auth);

    useEffect( _ => {
        if(isAuth){
            history.push("/");
        }
    }, [isAuth]);

    const handleChanges = (e) => {
        let {name, value} = e.target;
        value = value.trim();
        name === 'email' ? setEmail(value) : setPassword(value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validEmail = (email === '');
        const validPassword = (password === '');
        if(validEmail || validPassword){
            setError({email: validEmail, password: validPassword});
            return false;
        }
        dispatch(signInUser({email, password}))
            .then(data => errorMessage(data, addToast));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChanges}
                        value={email}
                        error={error.email}
                        helperText={error.email && "Incorrect email."}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChanges}
                        value={password}
                        error={error.password}
                        helperText={error.password && "Incorrect password."}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}

export default SignIn;