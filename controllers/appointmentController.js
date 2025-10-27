const mongoose = require('mongoose');
const Appointment = require('../models/appointmentModel');

// Define your salon time slots here
const timeSlots = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00","19:00"
];

// ---------------- CREATE APPOINTMENT ----------------
// const createAppointment = async (req, res) => {
//   const { name, surname, number, service, employee, time, comment, selectedDate } = req.body;

//   // Check required fields
//   const emptyFields = [];
//   if (!name) emptyFields.push('name');
//   if (!surname) emptyFields.push('surname');
//   if (!number) emptyFields.push('number');
//   if (!service) emptyFields.push('service');
//   if (!employee) emptyFields.push('employee');
//   if (!time) emptyFields.push('time');
//   if (!selectedDate) emptyFields.push('selectedDate');

//   if (emptyFields.length > 0) {
//     return res.status(400).json({ error: 'Please fill in all required fields', emptyFields });
//   }

//   try {
//     // Check if the time slot is already booked
//     const existing = await Appointment.findOne({ selectedDate, time, employee });
//     if (existing) {
//       return res.status(400).json({ error: 'This employee is already booked at that time.' });
//     }

//     const appointment = await Appointment.create({
//       name, surname, number, service, employee, time, comment, selectedDate
//     });

//     res.status(200).json(appointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


// ---------------- GET ALL APPOINTMENTS ----------------
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({}).sort({ date: 1, time: 1 });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------- GET SINGLE APPOINTMENT ----------------
const getAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------- GET AVAILABLE TIMES ----------------
const getAvailableTimes = async (req, res) => {
  const { employee, selectedDate } = req.query;

  if (!employee || !selectedDate) {
    return res.status(400).json({ error: 'Employee and date are required' });
  }

  try {
    const booked = await Appointment.find({ employee, selectedDate });
    const bookedTimes = booked.map(a => a.time);
    const availableTimes = timeSlots.filter(t => !bookedTimes.includes(t));

    res.status(200).json({ availableTimes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------- UPDATE APPOINTMENT ----------------
const updateStatus = async (req, res) => {
 try {
  const {status} = req.body
  const allowed = ["booked", "completed", "cancelled", "no-show"]

  if(!allowed.includes(status)){
    return res.status(400).json({error: "Invalid status"});
  }

  const appointment = await Appointment.findByIdAndUpdate(req.params.id, {
    status, updatedAt: new Date()
  },
{new: true}
)

res.status(200).json(appointment);
 } catch (error) {
  res.status(400).json({error: error.message})
 }
  }

  // ------------ EDIT APPOINTMENT -------------------
const editAppointment = async (req, res) => {
try {
  const {date, time, stylist, service, notes, number, name, surname, comment} = req.body

  const updatedAppointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    {date, time, stylist, service, notes, name, surname, number, comment,  updatedAt: new Date()},
    {new: true}
  )

  res.status(200).json(updatedAppointment)
} catch (error) {
  res.status(400).json({error : error.message})
}
}
// ---------------- DELETE APPOINTMENT ----------------
const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ error: 'Appointment not found' });

  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
    res.status(200).json({ message: 'Appointment deleted', appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAppointment = async (req, res) => {
  try {
    const { name, surname, number, service, stylist, time, comment,  date, status } = req.body;

    // check if that time is already taken
    const existing = await Appointment.findOne({ stylist, date, time });
    if (existing) {
      return res.status(400).json({
        message: "This time is already booked. Please choose another time.",
      });
    }

    const appointment = await Appointment.create({  name, surname, number, service, stylist, time, comment,  date, status });

    res.status(200).json({
      message: "Appointment booked successfully!",
      appointment, // include the created appointment data too
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const availableTimes = async (req, res) => {
  const { stylist, date } = req.body;

  // Example: salon operates 09:00–17:00 with 1-hour slots
  const allTimes = [
    "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00"
  ];

  // Get all booked times for that stylist and date
  const appointments = await Appointment.find({
    stylist,
    date, // store date and time separately in DB for easier lookup
  });

  const bookedTimes = appointments.map(a => a.time);

  // Filter out booked ones
  const availableTimes = allTimes.filter(t => !bookedTimes.includes(t));

  res.json({ availableTimes  });
};

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateStatus,
  editAppointment,
  deleteAppointment,
  availableTimes
};
