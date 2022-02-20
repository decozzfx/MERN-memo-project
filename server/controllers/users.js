import bcrypt from 'bcryptjs' // hash password
import jwt from 'jsonwebtoken' // store data of user to browse for some period of time
import dotenv from 'dotenv'

import User from '../models/users.js' // models

dotenv.config()

export const signin = async (req, res) => {
    const { email, password } = req.body
    
    try {
        const existingUser = await User.findOne({ email })

        if(!existingUser) return res.status(404).json({ message: "user doesn't exist"})

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if(!isPasswordCorrect) return res.status(404).json({ message: 'Invalid credentials' })
        
        const token = jwt.sign({ email : existingUser.email, id : existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn : '1h' })

        res.status(200).json({ result : existingUser, token })
        
    } catch (error) {
        res.status(500).json({ message : 'Something is wrong' })
    }
}

export const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    
    try {
        const existingUser = await User.findOne({ email })

        if(existingUser) return res.status(400).json({ message : 'User or Email is already exists.' })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password : hashedPassword, name : `${firstName} ${lastName}` })

        const token = jwt.sign({ email : result.email, id : result._id }, process.env.JWT_SECRET_KEY , { expiresIn : '1h' })

        res.status(200).json({ result , token })    

    } catch (error) {
        res.status(500).json({ message : 'Something is wrong' })
    }
}
