import { Button, Container, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { React, useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';

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

export default function HoneyTip (props) {
    const classes = useStyles();
    return (
        <div>
            <NavigationBar title={"Honey Tip"} />
            <main>
            <Container className={classes.cardGrid} maxWidth="md">
                <Typography variant='h5'>꿀팁 모음</Typography>
                <Grid container>
                    <Grid className={classes.questionGrid} xs={12} item>
                        <Link href={'/honey-tip/article/roadmap'}>
                            <Button className={classes.questionButton} color="primary" variant='text' size='large'>ML/DL 공부 로드맵</Button>
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </main>
        </div>
    )
}