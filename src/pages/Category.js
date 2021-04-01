import axios from 'axios';
import { React, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { API_BASE_URL } from '../constants';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import NavigationBar from '../components/NavigationBar';
import { isValidateToken } from '../services/auth.service';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '110%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      paddingLeft: "12%",
      paddingTop: '10%',
      width: '260px',
      flexGrow: 1,
    },
    cardTitle: {
        color: '#777777',
    }
})); 

const Category = (props) => {
    const classes = useStyles();
    const [tags, setTags] = useState([]);

    useEffect(() => {
        isValidateToken(props);
        getTags();
    }, [])

    const getTags = async () => {
        axios.get(API_BASE_URL + 'tag', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response => {
            setTags(response.data);
        })
    }

    return (
        <div>
            <NavigationBar title={"Categories"} />
            <main>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {tags.map((item) => (
                        <Grid item key={item.id} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography className={classes.cardTitle} gutterBottom variant="h5" component="h2">
                                        {item.name}
                                    </Typography>
                                    <Grid container style={{marginTop: '10px'}}>
                                    <Typography>
                                        {item.count} questions
                                    </Typography>
                                    <Link href={'/questions?tag='+item.id}>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                    </Link>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </div>
    )
}

export default withRouter(Category);