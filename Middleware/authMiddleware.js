const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
// let token

// if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
//     try {
//         // get token from header

//         token = req.headers.authorization.split(' ')[1]

//         //verify

//         const decoded = jwt.verify(token, process.env.JWT_SECRET)

//         // get user from token

//         req.user = await User.findById(decoded.id).select('-password')

//         next()
//     } catch (error) {
//         console.log(error)
//         res.status(401)
//         throw new Error('Not Authorized')
//     }
// }

// if(!token) {
//      res.status(401)
//         throw new Error('No Token')
// }

const authHeader = req.headers.authorization;

if(!authHeader || !authHeader.startsWith('Bearer')){
    return res.status(401).json({message: 'No token provided'})
}

const token = authHeader.split(' ')[1];

try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password')

    if(!req.user){
        return res.status(401).json({message: 'User not found'})
    }

    next()
} catch (error) {
     console.error('JWT Error:', error.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
}
})

module.exports ={
    protect
}
