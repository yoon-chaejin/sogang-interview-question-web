import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import queryString from 'query-string'
import NavigationBar from '../components/NavigationBar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { Button, Grid, IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    questionGrid: {
        paddingTop: theme.spacing(1)
    },
    questionButton: {
    }
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
                <Grid container>
                    {questions.map((item) => (
                        <Grid className={classes.questionGrid} xs={12} item key={item.id}>
                            <Link href={'/questions/'+item.id}>
                                <Button className={classes.questionButton} color="primary" variant='text' size='large'>{item.content}</Button>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </main>
    </div>
    )
}

export default withRouter(Questions);