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
import { isValidateToken } from '../services/auth.service';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    questionGrid: {
        paddingTop: theme.spacing(1)
    },
    questionButton: {
        textTransform: 'none',
        width: '100%',
        justifyContent: 'flex-start',
        textAlign: 'left'
    },
    title: {
        paddingBottom: theme.spacing(2)
    }
}));

const Questions = (props) => {
    const classes = useStyles();

    const [questions, setQuestions] = useState([]);
    const [tagId, setTagId] = useState(0);
    const [tagName, setTagName] = useState('');
    
    useEffect(() => {
        isValidateToken(props);
        const { tag } = queryString.parse(props.location.search);
        setTagId(tag);
    }, [])

    useEffect(() => {
        if (tagId) {
            getQuestions(props);
            getTagName();
        }
    }, [tagId])

    useEffect(() => {
        props.history.push('/questions?tag=' + queryString.parse(props.location.search).tag);
    }, [questions])

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
                <Typography className={classes.title} variant='h5'>{tagName}</Typography>
                <Grid container>
                    {questions.map((item) => (
                        <Grid className={classes.questionGrid} xs={12} item key={item.intv_question_id}>
                            <Link href={'/questions/'+item.intv_question_id}>
                                <Button className={classes.questionButton} color="primary" variant='outlined' size='large'>{item.intv_question_content + ' [' + item.intvAnswerCount + ']'}</Button>
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