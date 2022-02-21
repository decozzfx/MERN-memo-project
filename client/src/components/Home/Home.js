import React from "react";
import { Container, Grow, Grid } from '@material-ui/core'


import Posts from '../Posts/Posts'
import Form from "../Form/Form";

const Home = ({ dispatch, currentId, setCurrentId, user }) => {

    // console.log(user)
    return (
        <Grow in >
            <Container>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} >
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} dispatch={dispatch} setCurrentId={setCurrentId} user={user} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home