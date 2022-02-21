import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

// want to like a post
// click the like button => auth middleware (), confirm or denied the request if valid then next() => like controller

const auth = async (req, res, next) => { // validating token from signin or signup
    // console.log(req)
    try {
        // console.log(req.headers)
        const token = req.headers.authorization.split(' ')[1] // [1] selecting element, the position after 'Bearer'
        const isCustomAuth = token.length < 500 // if less than 500 its mean custom token , if more than 500 its mean googleOauth
        
        let decodedData
        
        if( token && isCustomAuth ){
            decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
            
            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)
            
            req.userId = decodedData.sub // sub is google name for specific id that deviricient every google user  
        }
        
        next()

    } catch (error) {
        console.log(error)
    }
}

export default auth