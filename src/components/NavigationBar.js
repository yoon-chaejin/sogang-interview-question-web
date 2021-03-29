
import { React } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button, Grid, Icon, IconButton, makeStyles } from '@material-ui/core';
import { signOut } from '../services/auth.service';
import { withRouter } from 'react-router';
const useStyles = makeStyles((theme) => ({
    typographyTitle: {
        flex: 1,
    },
    navigationButton: {
        color: '#ffffff',
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

const NavigationBar = (props) => {
    const classes = useStyles();

    const handleClick = (url) => {
        switch (url) {
            case '/':
                signOut();
            default :
                props.history.push(url);
        }
    }
    return (
        <div>
            <CssBaseline />
            <AppBar position="relative" color="primary">
                <Toolbar>
                    <Typography className={classes.typographyTitle} variant="h6" color="inherit" noWrap>
                        {props.title}
                    </Typography>
                    <Button className={classes.navigationButton} onClick={() => handleClick('/honey-tip')}>Honey Tip</Button>
                    <Button className={classes.navigationButton} onClick={() => handleClick('/categories')}>Categories</Button>
                    <Button className={classes.navigationButton} onClick={() => handleClick('/mypage')}>My Page</Button>
                    <Button className={classes.navigationButton} onClick={() => handleClick('/')}>Signout</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default withRouter(NavigationBar);