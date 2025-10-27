const express = require('express');
const {
  createAppointment,
  getAppointments,
  getAppointment,
  deleteAppointment,
  availableTimes,
  editAppointment,
  updateStatus
} = require('../controllers/appointmentController');
const {protect} = require('../Middleware/authMiddleware')
const router = express.Router();

// 🗓️ Get all appointments
router.get('/', protect,  getAppointments);

// 🕒 Check available times (frontend sends stylist + date)
router.post('/available-times', availableTimes);

// 💬 Book an appointment
router.post('/book', createAppointment);

// 🔍 Get single appointment by ID
router.get('/:id',  protect,  getAppointment);

// ❌ Cancel appointment
router.delete('/cancel/:id',  protect,  deleteAppointment);

// 🔁 Edit appointment
router.patch('/edit/:id',  protect,  editAppointment);

// Change status
router.patch('/status/:id',  protect,  updateStatus)

module.exports = router;
