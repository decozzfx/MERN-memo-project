import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import useStyles from './styles'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('profile'))

    const noneImageUrl = 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'

    // console.log(post)

    const Likes = () => {
        if(post.likes.length > 0){
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id)) ? (
                <><ThumbUpAltIcon fontSize='small'/>&nbsp;{post.likes.length > 2 ? `you and ${post.likes.length -1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}</>
                ) : (
                <><ThumbUpAltOutlined fontSize='small'/>&nbsp;{post.likes.length}&nbsp;{post.likes.length === 1 ? 'Like' : 'Likes'}</>
            )
         }
        return <><ThumbUpAltOutlined fontSize='small' />&nbsp;</>
    }

    const likeHandle = () => {
        dispatch(likePost(post._id))
    }

    const openPost = () => navigate(`/posts/${post._id}`)

  return (
    <Card className={classes.card} raised elevation={6}>
        <ButtonBase component="span" name="test" className={classes.cardAction} onClick={openPost} >
            <CardMedia className={classes.media} image={post.selectedFile || noneImageUrl} title={post.title}/>
            <div className={classes.overlay}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post.creator || user?.result?._id === post.creator) && (
                <div className={classes.overlay2}>
                    <Button style={{color : 'white'}} size='small' onClick={() => setCurrentId(post._id)}>
                        <MoreHorizIcon fontSize='medium' />
                    </Button>
                </div>
            )}
            <div className={classes.details}>
            {post?.tags ? (post?.tags.map((tag, idKey) => (
                <Typography key={idKey} variant='body2' color='textSecondary'> { `#${tag} `} </Typography>
            ) )) : ('')}
            </div>
                <Typography className={classes.title} variant='h5' gutterBottom >{post.title} </Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message} </Typography>
            </CardContent>
        </ButtonBase>
        <CardActions className={classes.cardActions}>
            <Button size='small' color='primary' disabled={!user?.result} onClick={likeHandle}>
                <Likes/>
            </Button>
            {( user?.result?.googleId === post?.creator || user?.result?._id === post?.creator ) && (
                <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id)) }>
                    <DeleteIcon fontSize='small' />
                    &nbsp;Delete
                </Button>
            )}
        </CardActions>
    </Card>
  )
}

export default Post