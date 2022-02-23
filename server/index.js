import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js' 
import userRoutes from './routes/users.js' 

dotenv.config()

const app = express()

 
app.use(bodyParser.json({ limit : '30mb', extended : true }))
app.use(bodyParser.urlencoded({ limit : '30mb', extended : true }))
app.use(cors())

app.use('/posts', postRoutes) // crud endpoint routes
app.use('/user', userRoutes)  // user auth endpoint routes

app.use('/', (req, res) => {
    res.send('Hello, Welcome to Moment App API')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology : true })
.then(() => app.listen(PORT, () => console.log(`Server is running on Port http://localhost:${PORT}`) ))
.catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false)