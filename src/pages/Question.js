import { Collapse, Container, IconButton, List, ListItem, ListItemText, makeStyles, TextField, Typography, Grid } from '@material-ui/core';
import { ChangeHistory, Details } from '@material-ui/icons';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { API_BASE_URL } from '../constants';

const useStyles = makeStyles((theme) => ({
    questionSection: {
        paddingTop: theme.spacing(12),
        paddingBottom: theme.spacing(2),
    },
    answerSection: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(4)
    },
    textField: {
        width: '100%',
    },
    sectionTitle: {
        paddingBottom: theme.spacing(4)
    }
}));

const Question = (props) => {
    const classes = useStyles();
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState([{id: 1, content: "다른 사람의 답변을 볼 수 있습니다."}])

    useEffect(() => {
        getQuestion();
    })

    const getQuestion = () => {
        axios.get(API_BASE_URL + 'intv-question/' + props.match.params.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setQuestion(response.data.content);
        })
    }
    return (
        <div>
            <NavigationBar title={'Question and Answer'} />
            <main>
                <Container className={classes.questionSection} maxWidth="md">
                    <Grid container>
                        <Grid item md={3} xs={12}>
                            <Typography className={classes.sectionTitle} variant='h5'>Question</Typography>
                        </Grid>
                        <Grid item md={9} xs={12}>
                            <Typography variant='h6'>{question}</Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.answerSection} maxWidth="md">
                    <Typography className={classes.sectionTitle} variant='h5'>Answer</Typography>
                    <Grid container>
                        <Grid xs={12} item>
                            <TextField className={classes.textField} multiline variant='outlined' rows={4} placeholder={'답변을 남겨주세요'}></TextField>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.answerSection} maxWidth="md">
                    <Typography className={classes.sectionTitle} variant='h5'>Other Answers</Typography>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {answers.map((item) => (
                            <Grid key={item.id} item container>
                                <Grid xs={2} md={1} item container direction='column'>
                                    <IconButton><ChangeHistory></ChangeHistory></IconButton>
                                    <IconButton><Details></Details></IconButton>
                                </Grid>
                                <Grid xs={10} md={11} item>
                                    <TextField className={classes.textField} disabled multiline variant='outlined' rows={4} defaultValue={item.content}></TextField>
                                </Grid>
                            </Grid>
                        ))}
                    </List>
                </Container>
            </main>
        </div>
    )
}

export default withRouter(Question);