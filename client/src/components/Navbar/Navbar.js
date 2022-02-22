import React, { useEffect } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { useDispatch } from "react-redux";
import decode from 'jwt-decode'

import useStyles from './styles'
import memories from '../../images/memories.png'


const Navbar = ({ user, setUser }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    
    const logout = () => {
        dispatch({ type: 'LOGOUT' })
        
        navigate('/')

        setUser(null)
    }

    useEffect(() => {
        const token = user?.token

        if(token){ // cheking expirity of token
            const decodedToken = decode(token)

            if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
            <Typography component={Link} to='/' className={classes.heading} variant="h3" align="center">Moment</Typography>
            <img className={classes.image} src={memories} height="60" alt="memories" />    
        </div>
        <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.avatar} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to='/auth' variant='contained' color='primary'>Login</Button>
            )}
        </Toolbar>
    </AppBar>
  );
};

export default Navbar;
