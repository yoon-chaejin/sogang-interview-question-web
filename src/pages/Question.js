import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { signOut } from '../services/auth.service';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import queryString from 'query-string'

const useStyles = makeStyles((theme) => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(4),
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardMedia: {
      paddingTop: '56.25%', // 16:9
    },
    cardContent: {
      flexGrow: 1,
    },
    footer: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(6),
    },
}));

const Question = ({location, ...props}) => {
    const classes = useStyles();

    const [questions, setQuestions] = useState([]);
    const [tagId, setTagId] = useState(0)
    
    useEffect(() => {
        const { tag } = queryString.parse(location.search);
        setTagId(tag);
    }, [])

    useEffect(() => {
        if (tagId) {
            getQuestions();
        }
    }, [tagId])

    const getQuestions = async () => {
        axios.get(API_BASE_URL+'intv-question/tag/'+tagId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            } 
        })
        .then(response => {
            setQuestions(response.data);
        })
    }

return (
    <div>
        <CssBaseline />
        <AppBar position="relative" color="primary">
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                Questions
            </Typography>
            </Toolbar>
        </AppBar>
        <main>
            <Container className={classes.cardGrid} maxWidth="md">
                <List component="nav" aria-label="secondary mailbox folders">
                    {questions.map((item) => (
                        <ListItem button>
                            <ListItemText primary={item.content} />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </main>
        {/* Footer
        <footer className={classes.footer}>
            <Typography variant="h6" align="center" gutterBottom>
            Footer
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
            Something here to give the footer a purpose!
            </Typography>
        </footer>
        {/* End footer */}
    </div>
    )
}

export default withRouter(Question);