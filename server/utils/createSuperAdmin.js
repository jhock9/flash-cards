require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');

const MONGO_URI = process.env.MONGO_URI;
const SUPER_ADMIN_PASS = process.env.SUPER_ADMIN_PASS;

const createSuperAdmin = async () => {
  await mongoose.connect(MONGO_URI);
  
  const superAdmin = new User({
    fullname: 'Super Admin',
    username: 'SuperAdmin',
    password: SUPER_ADMIN_PASS,
    role: 'admin',
  });
  
  const defaultAppointment = new Appointment({ user: superAdmin._id });
  await defaultAppointment.save();
  superAdmin.defaultAppointment = defaultAppointment._id;
  
  await superAdmin.save();
  console.log('SuperAdmin user created successfully');
  process.exit();
}

createSuperAdmin();
