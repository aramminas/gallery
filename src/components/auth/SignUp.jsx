import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import validator from 'validator';
import {Avatar, CssBaseline, TextField, Grid, Box, Typography, Container, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles} from '@material-ui/core/styles';
import { useToasts } from "react-toast-notifications";
import {errorMessage} from "../../helpers/helpers";

/* actions */
import {signUpUser} from "../../store/actions/authAction";

/* components */
import Copyright from "../general/Copyright"

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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const initError = {email: false, password: false, firstName: false, lastName: false};

const passwordError = <em>A password of at least <strong>8 characters</strong> in length contains a combination
    of <strong>uppercase and lowercase letters</strong>, a <strong>number</strong> , and
    a <strong>symbol</strong>.</em>;

function SignUp() {
    const {addToast} = useToasts();
    const history = useHistory();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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

        switch (name){
            case 'firstName':
                setFirstName(value);
                break;
            case 'lastName':
                setLastName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const firstN = (firstName === '');
        const lastN = (lastName === '');
        const validEmail = !validator.isEmail(email);
        const validPassword = !validator.isStrongPassword(password);
        setError({email: validEmail, password: validPassword});
        if(validEmail || validPassword || firstN || lastN){
            setError({email: validEmail, password: validPassword, firstName: firstN, lastName: lastN});
            return false;
        }

        dispatch(signUpUser({firstName, lastName, email, password}))
            .then(data => errorMessage(data, addToast));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={handleChanges}
                                value={firstName}
                                error={error.firstName}
                                helperText={error.firstName && "First Name cannot be empty."}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={handleChanges}
                                value={lastName}
                                error={error.lastName}
                                helperText={error.lastName && "Last Name cannot be empty."}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChanges}
                                value={email}
                                error={error.email}
                                helperText={error.email && "Incorrect email."}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
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
                                helperText={error.password && passwordError}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/sign-in" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}

export default SignUp;