import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js' 

dotenv.config()

const app = express()


app.use(bodyParser.json({ limit : '30mb', extended : true }))
app.use(bodyParser.urlencoded({ limit : '30mb', extended : true }))
app.use(cors())

app.use('/posts', postRoutes)

app.use('/', (req, res) => {
    res.send('Hello to Post Moment API')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_CONNECTION_URL, { useNewUrlParser : true, useUnifiedTopology : true })
.then(() => app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`) ))
.catch((error) => console.log(error.message))

// mongoose.set('useFindAndModify', false)