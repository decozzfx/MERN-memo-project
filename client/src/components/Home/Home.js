import React,{ useState } from "react";
import { Container, Grow, Grid, Paper, TextField, Button, AppBar } from '@material-ui/core'
import ChipInput from 'material-ui-chip-input'
import { useNavigate, useLocation } from "react-router-dom"

import Posts from '../Posts/Posts'
import Form from "../Form/Form";
import Pagination from "../Pagination";
import useStyles from './styles'

import { getPostBySearch } from "../../actions/posts";

function useQuery(){
    return new URLSearchParams(useLocation().search) // setup url search params for to know which page currently on and what's search looking for 
}

const Home = ({ dispatch, currentId, setCurrentId, user }) => {
    const classes = useStyles()
    const query = useQuery()    // get query
    const navigate = useNavigate()
    const page = query.get('page') || 1 // read url and see what we have a parameter in there
    const searchQuery = query.get('searchQuery') 
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    // console.log(page)
    // console.log(searchQuery)
    // console.log(tags)
    // console.log(search)

    function handleKeyPress(e) {
        if(e.keyCode === 13){ //e.keyCode === 13 its mean the ENTER keypress
            handleSearchPost()
        }
    }
    
    const handleAddTag = (tag) => setTags([...tags, tag])

    const handleDeleteTag = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete ))

    const handleSearchPost = () => {
        if(search.trim() || tags){ // trim() to make sure there's no space in the state
            dispatch(getPostBySearch({ search, tags: tags.join(',') })) // convert to string type we can't pass an array through the url parameter
            
            // set frontend route for search specific term so can share or use for relevant information
            navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        }else{
            navigate('/')
        }
    }

    return (
        <Grow in >
            <Container maxWidth='xl'>
                <Grid container justifyContent='space-between' alignItems='stretch' spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch}  position='static' color='inherit'>
                        <TextField 
                        name='search' 
                        label='Search Moment'
                        variant="outlined"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyPress={handleKeyPress}
                        />
                        <ChipInput 
                        style={{ margin: '10px 0' }}
                        value={tags}
                        onAdd={handleAddTag}
                        onDelete={handleDeleteTag}
                        label='Search by Tags'
                        variant='outlined'
                        newChipKeys={[","]}
                        />
                        <Button onClick={handleSearchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
                        </AppBar>
                        <Form currentId={currentId} dispatch={dispatch} setCurrentId={setCurrentId} user={user} />
                        <Paper elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home