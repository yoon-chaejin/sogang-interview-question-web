import { Collapse, Container, IconButton, List, ListItem, ListItemText, makeStyles, TextField, Typography, Grid, Button } from '@material-ui/core';
import { Bookmark, BookmarkBorderOutlined, ChangeHistory, Details } from '@material-ui/icons';
import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { API_BASE_URL } from '../constants';
import { isValidateToken } from '../services/auth.service';

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
        "& .Mui-disabled": {
            color: "rgba(0, 0, 0, 1)" // (default alpha is 0.38)
          }
    },
    sectionTitle: {
        paddingBottom: theme.spacing(4),
        alignContent: 'center',
    }
}));

const Question = (props) => {
    const classes = useStyles();
    const [question, setQuestion] = useState({});
    const [answers, setAnswers] = useState([])
    const [myAnswer, setMyAnswer] = useState('');
    const [myAnswerId, setMyAnswerId] = useState('');

    useEffect(() => {
        isValidateToken(props);
        getQuestion();
    }, [])
    
    const getQuestion = () => {
        axios.get(API_BASE_URL + 'intv-question/' + props.match.params.id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setQuestion(response.data);
            setAnswers(response.data.intvAnswers.filter(item => item.user.id != localStorage.getItem('userId')));
            setMyAnswer(response.data.intvAnswers.filter(item => item.user.id == localStorage.getItem('userId'))[0]
                ? response.data.intvAnswers.filter(item => item.user.id == localStorage.getItem('userId'))[0].content : '');
            setMyAnswerId(response.data.intvAnswers.filter(item => item.user.id == localStorage.getItem('userId'))[0]
            ? response.data.intvAnswers.filter(item => item.user.id == localStorage.getItem('userId'))[0].id : '')
        })
    }

    const handleSubmit = () => {
        if(!myAnswer) {
            alert('Empty');
            return;
        }

        axios.post(API_BASE_URL + 'intv-answer',
            {
                userId: localStorage.getItem('userId'),
                intvQuestionId: question.id,
                content: myAnswer,
            },
            {
                headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            alert("답변이 등록되었습니다.");
        })
        .catch(error => {
            alert("오류가 발생했습니다.")
        })
    }

    const handleBookmark = () => {
        axios.put(API_BASE_URL+'intv-question/bookmark', {
            userId: localStorage.getItem('userId'),
            intvQuestionId: question.id,
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            getQuestion();
        })
    }

    const handleDelete = () => {
        if (myAnswerId == '') {
            setMyAnswer('');
            return;
        }
        axios.delete(API_BASE_URL+'intv-answer/'+myAnswerId, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setMyAnswer('');
        })
        .catch(error => {

        })
    }
    return (
        <div>
            <NavigationBar title={'Question and Answer'} />
            <main>
                <Container className={classes.questionSection} maxWidth="md">
                    <Grid container>
                        <Grid item md={3} xs={12}>
                            <Typography className={classes.sectionTitle} variant='h5'>
                                Question
                            </Typography>
                        </Grid>
                        <Grid item md={9} xs={12}>
                            <Typography variant='h6'>{question.content}
                            <IconButton onClick={handleBookmark}>
                                {question && question.bookmarkedUsers && question.bookmarkedUsers.find(item => item.id == localStorage.getItem('userId')) ? <Bookmark></Bookmark> : <BookmarkBorderOutlined></BookmarkBorderOutlined>}
                            </IconButton></Typography>
                        </Grid>
                    </Grid>
                </Container>
                <Container className={classes.answerSection} maxWidth="md">
                    <Typography className={classes.sectionTitle} variant='h5'>Answers</Typography>
                    <List component="nav" aria-label="secondary mailbox folders">
                        {answers.map((item) => (
                            <Grid className={classes.answerSection} key={item.id} item container>
                                {/* <Grid xs={2} md={1} item container direction='column'>
                                    <IconButton><ChangeHistory></ChangeHistory></IconButton>
                                    <IconButton><Details></Details></IconButton>
                                </Grid> */}
                                <Grid xs={12} md={12} item>
                                    <TextField 
                                        className={classes.textField} multiline variant='outlined' rows={4} defaultValue={item.content} disabled
                                        onCopy={(e)=>e.preventDefault()} onCut={(e)=>e.preventDefault()} onDragStart={(e)=>e.preventDefault()}/>
                                </Grid>
                            </Grid>
                        ))}
                    </List>
                </Container>
                <Container className={classes.answerSection} maxWidth="md">
                    <Typography className={classes.sectionTitle} variant='h5'>Your Answer</Typography>
                    <Grid container>
                        <Grid xs={12} item>
                            <TextField className={classes.textField} multiline variant='outlined' rows={4} placeholder={'답변을 남겨주세요'} value={myAnswer || ''} onChange={(event) => setMyAnswer(event.target.value)}></TextField>
                        </Grid>
                        <Grid xs={7} md={10} item></Grid>
                        <Grid xs={5} md={2} item>
                            <Button onClick={handleSubmit}>Save</Button>
                            <Button onClick={handleDelete}>Delete</Button>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    )
}

export default withRouter(Question);