import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    image: {
      backgroundImage: 'url(https://sogang-tree-dev.s3.ap-northeast-2.amazonaws.com/images/home_v01.png)',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#FFFFFF',
      backgroundSize: '130%',
      backgroundPosition: 'center',
    },
    paper: {
      margin: theme.spacing(8, 4),
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

const SignIn = (props) => {
    const classes = useStyles();
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    useEffect(() => {
        if (localStorage.getItem('token')) {
            props.history.push('/')
        }
    })
    const signIn = async () => {
        axios.post(API_BASE_URL+'auth/login', { email, password })
        .then(response => {
            switch (response.status) {
                case 401 : 
                    alert(response.statusText);
                    break;
                default :
                    if (response.data.accessToken) {
                        localStorage.setItem("user", response.data.user);
                        localStorage.setItem("token", response.data.accessToken);
                    }
                    alert('Success');
                    props.history.push('/categories');
            }
        })
        .catch(error => {
            alert(error.response.data.message);
        })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            signIn();
        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form}>
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
                    <Button
                        onClick={() => signIn()}
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Sign In
                    </Button>
                    <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                        <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                    <Box mt={5}>
                    </Box>
                </form>
                </div>
            </Grid>
        </Grid>
    )
}

export default withRouter(SignIn);