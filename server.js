require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const appointmentRoutes = require('./routes/appointmentRoutes')
const inventoryRoutes = require('./routes/inventoryRoutes')
const userRoutes = require('./routes/userRoutes')
// express app
const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))
app.use((req, res, next) => {
    next()
} )

//routes
app.use( '/appointment',appointmentRoutes)
app.use( '/inventory',inventoryRoutes)
app.use( '/users', userRoutes)


mongoose.connect(process.env.MONGO_URI)
.then(() => {
//port
app.listen(process.env.PORT, () => {
    console.log('Connected to db and Listening on port', process.env.PORT)
})
})
.catch((error) => {
    console.log(error)
})
