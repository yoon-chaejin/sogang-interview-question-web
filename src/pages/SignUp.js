import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../constants';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
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

const SignUp = (props) => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [sogangMail, setSogangMail] = useState('');

    const signUp = () => {
        if (username === null || username === '') {
            alert('Username Empty');
            return;
        }
        if (email === null || email === '') {
            alert('Email Empty');
            return;
        }
        if (password === null || password === '') {
            alert('Password Empty');
            return;
        }
        if (passwordCheck === null || passwordCheck === '') {
            alert('Password Check Empty');
            return;
        }
        if (password !== passwordCheck) {
            alert('Password and Password Check Different');
            return;
        }
        if (sogangMail.indexOf('@sogang.ac.kr') < 0) {
            alert('Sogang Mail Only');
            return;
        }
        
        return axios.post(API_BASE_URL + "users", {
          username,
          email,
          password,
          sogangMail,
        })
        .then(response => {
            alert('Check your Sogang Mail and Click the Authentication URL');
            props.history.push('/signin');
        })
        .catch(error => {
            alert(error.response.data.message);
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            signUp();
        }
        if (event.key === 'Tab' || event.charCode === 9) {
        }
    }

    return (
        <div>
            <Grid className={classes.root} container component="main">
                <CssBaseline />
                <Grid>
                    <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event) => setUsername(event.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(event) => setEmail(event.target.value)}
                            onKeyPress={handleKeyPress}
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
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password-check"
                            label="Password Check"
                            type="password"
                            id="password-check"
                            autoComplete="current-password"
                            onChange={(event) => setPasswordCheck(event.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="sogang-email"
                            label="Sogang Email"
                            type="email"
                            id="sogang-email"
                            autoComplete="email"
                            onChange={(event) => setSogangMail(event.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <Button
                            onClick={() => signUp()}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                        Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    {"Already have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                        </Box>
                    </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(SignUp);