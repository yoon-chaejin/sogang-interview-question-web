import { Button, Container, Grid, Link, makeStyles, Paper, TextField } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { withRouter } from "react-router"
import NavigationBar from "../components/NavigationBar";
import SideMenu from "../components/SideMenu";
import { API_BASE_URL } from "../constants";

const useStyles = makeStyles((theme) => createStyles({
    containerGrid: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        }
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    sideMenuGrid: {
        [theme.breakpoints.up('md')]: {
            marginRight: theme.spacing(5)
        },
        [theme.breakpoints.down('xs')]: {
            paddingBottom: theme.spacing(2),
        }
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    questionButton: {
        textAlign: 'left',
        textTransform: 'none'
    }
}))

const MyPage = () => {
    const classes = useStyles();
    const menuList = ['Personal Information', 'Bookmarks', 'My Answers'];
    const [menu, setMenu] = useState(menuList[0]);
    const [user, setUser] = useState({});
    const [bookmarks, setBookmarks] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordCheck, setNewPasswordCheck] = useState('');

    useEffect(() => {
        getUser();
    }, [])

    const getUser = () => {
        axios.get(API_BASE_URL+'users/'+localStorage.getItem('userId')+'/info', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }) 
        .then(response => {
            const { bookmarks, intvAnswers, ...user } = response.data;
            setUser(user);
            setBookmarks(bookmarks);
            setAnswers(intvAnswers);
        })
    }

    const handleSubmit = () => {
        if (password == '') {
            alert('기존 비밀번호를 입력해주세요.')
            return;
        }
        if (newPassword == '') {
            alert('새로운 비밀번호를 입력해주세요.')
            return;
        }
        if (newPassword !== newPasswordCheck) {
            alert('새로운 비밀번호가 일치하지 않습니다.');
            return;
        }
        axios.put(API_BASE_URL+'users/'+localStorage.getItem('userId')+'/password', {
            password: password,
            newPassword: newPassword,
        },
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            alert('비밀번호가 성공적으로 변경되었습니다.');
            setPassword('');
            setNewPassword('');
            setNewPasswordCheck('');
        })
        .catch(error => {
            alert('틀린 비밀번호입니다.');
        })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.charCode === 13) {
            handleSubmit();
        }
        if (event.key === 'Tab' || event.charCode === 9) {
        }
    }

    return (
        <div>
            <NavigationBar title={"MyPage"} />
            <Grid className={classes.containerGrid} container>
                <Grid md={1} item></Grid>
                <Grid className={classes.sideMenuGrid} xs={12} md={2} item>
                    <SideMenu menuList={menuList} menu={menu} setMenu={setMenu}></SideMenu>
                </Grid>
                <Grid xs={12} md={8} item>
                    <Paper className={classes.paper}>
                        {menu === menuList[0] ?
                        // personal information
                        <form className={classes.form}>
                            <TextField 
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id='username'
                                label="Username"
                                name="username"
                                InputProps={{readOnly: true}}
                                InputLabelProps={{shrink: true}}
                                value={user.username || ''}
                                //defaultValue={user.username || ''}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                id='email'
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                InputProps={{readOnly: true}}
                                InputLabelProps={{shrink: true}}
                                value={user.email || ''}
                                //defaultValue={user.email || ''}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id='password'
                                value={password || ''}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id='new-password'
                                value={newPassword || ''}
                                onChange={(event) => setNewPassword(event.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="new-password-check"
                                label="New Password Check"
                                type="password"
                                id='new-password-check'
                                value={newPasswordCheck || ''}
                                onChange={(event) => setNewPasswordCheck(event.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >Submit</Button>
                        </form>
                        : menu === menuList[1] ?
                        // bookmarks
                        <Grid container>
                            {bookmarks.map((item) => (
                                <Grid xs={12} item key={item.id}>
                                    <Link href={'/questions/'+item.id}>
                                        <Button className={classes.questionButton} variant='text' size='large'>{item.content}</Button>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        : 
                        // my answers
                        <Grid container>
                            {answers.map((item) => (
                                <Grid xs={12} item key={item.id}>
                                    <Link href={'/questions/'+item.intvQuestion.id}>
                                        <Button className={classes.questionButton} variant='text' size='large'>{item.content}</Button>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                        }
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(MyPage);