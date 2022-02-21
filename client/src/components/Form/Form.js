import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useSelector } from 'react-redux'

import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId, dispatch, user }) => {
    const classes = useStyles()
    const [ postData, setPostData] = useState({ title : '', message : '', tags : '', selectedFile: '', })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null ) // posts is from reducer
    // console.log(user)

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId){

            dispatch(updatePost(currentId, { ...postData, name : user?.result?.name })) // name = post name of user as creator
        }else{
            dispatch(createPost({ ...postData, name : user?.result?.name }))
        }
        clear()
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper} >
                <Typography variant='h6' align='center' >
                    Please Sign In to create moments and like other's moments
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(0)
        setPostData({ title : '', message : '', tags : '', selectedFile: '', })
    }

  return (
        <Paper className={classes.paper}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant='h6'>{ currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                name='title' 
                variant='outlined' 
                label='Title' 
                fullWidth 
                value={postData.title} 
                onChange={(e) => setPostData({ ...postData, title : e.target.value })} 
                />
                <TextField 
                name='message' 
                variant='outlined' 
                label='Message' 
                fullWidth 
                value={postData.message} 
                onChange={(e) => setPostData({ ...postData, message : e.target.value })} 
                />
                <TextField 
                name='tags' 
                variant='outlined' 
                label='Tags' 
                fullWidth 
                value={postData.tags} 
                onChange={(e) => setPostData({ ...postData, tags : e.target.value.split(',') })} 
                />
                <div className={classes.fileInput}>
                    <FileBase 
                    type="file" 
                    multiple={false} 
                    onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth >Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth >Clear</Button>
            </form>
        </Paper>
    )
}

export default Form