import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../constants';
import { signOut } from '../services/auth.service';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import queryString from 'query-string'
import NavigationBar from '../components/NavigationBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

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

const Questions = ({location, ...props}) => {
    const classes = useStyles();

    const [questions, setQuestions] = useState([]);
    const [tagId, setTagId] = useState(0);
    const [tagName, setTagName] = useState('');
    
    useEffect(() => {
        const { tag } = queryString.parse(location.search);
        setTagId(tag);
    }, [])

    useEffect(() => {
        if (tagId) {
            getQuestions();
            getTagName();
        }
    }, [tagId])


    const getTagName = async () => {
        axios.get(API_BASE_URL+'tag/'+tagId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setTagName(response.data.name);
        })
    }
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
        <NavigationBar title={"Questions"} />
        <main>
            <Container className={classes.cardGrid} maxWidth="md">
                <Typography variant='h5'>{tagName}</Typography>
                <List component="nav" aria-label="secondary mailbox folders">
                    {questions.map((item) => (
                        <Link key={item.id} href={'/questions/'+item.id}>
                            <ListItem button >
                                <ListItemText primary={item.content} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
            </Container>
        </main>
    </div>
    )
}

export default withRouter(Questions);