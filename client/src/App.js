import React, { useEffect, useState } from "react";
import { Container} from '@material-ui/core'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getPosts } from './actions/posts'

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    const [currentId, setCurrentId] = useState(0)
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts());
      }, [currentId, dispatch])

    return (
        <BrowserRouter>
            <Container maxWidth='lg' >
                <Navbar user={user} setUser={setUser} />
                <Routes>
                    <Route path='/' exact element={<Home currentId={currentId} user={user} setCurrentId={setCurrentId} dispatch={dispatch} />} />
                    <Route path='/auth' exact element={<Auth/>} />
                </Routes>
            </Container>
        </BrowserRouter>
    )
}

export default App