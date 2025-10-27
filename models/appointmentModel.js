const mongoose = require('mongoose')
const Schema = mongoose.Schema

const appointmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    service: {
        type: String,
        required: true
    },
  
    stylist:{
        type: String,
        required: true
    },
    time: {
type: String,
required: true
    },
    comment: {
        type: String,
        required : false
    },
    date: {
        type: String,
        required : true
    },
    status: {
        type: String,
        enum: ["booked", "completed", "cancelled", "no-show"],
        default: "booked"
    },
    

}, {timestamps: true})

module.exports = mongoose.model('Appointment', appointmentSchema)