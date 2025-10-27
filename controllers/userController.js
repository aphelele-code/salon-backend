const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


// Sign Up user
const signUp = asyncHandler(async(req, res) => {
const { username, password } = req.body

const userExists = await User.findOne({username})
if (userExists){
    res.status(400)
    throw new Error("Username already exists.")
  
}
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)

const user = await User.create({
username, password: hashedPassword
})

if(!username || !password){
res.status(400)
throw new Error('Please fill in all the fields.')

}

if(user){
    res.status(201).json({
        _id: user.id,
        username: user.username,
        token: genToken(user.id)
    })
}else{
    res.status(400)
    throw new Error('Invalid User Data.')
}



}) 
// Logs In
const logIn = asyncHandler(async(req, res) => {
const {username, password} = req.body

const user = await User.findOne({username})

if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({_id : user.id, 
        username : user.username, 
        token: genToken(user.id)})
}else{
    res.status(400).json({error: 'Invalid credentials'})
}
}) 

// Auth user
const authUser = asyncHandler(async(req, res) => {
 const {_id, username} = await User.findById(req.user.id)

 res.status(200).json({
    id: _id,
    username
 })
}) 


// Generate JWT
const genToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    signUp,
    logIn,
    authUser
}



