require('dotenv').config();
const logger = require('../server/config/winston');
const mongoose = require('mongoose');
const User = require('../server/models/userModel');

const MONGO_URI = process.env.MONGO_URI;
const SUPER_ADMIN_PASS = process.env.SUPER_ADMIN_PASS;

const createSuperAdmin = async () => {
  await mongoose.connect(MONGO_URI);
  
  const superAdmin = new User({
    username: 'SuperAdmin',
    password: SUPER_ADMIN_PASS,
    role: 'admin',
  });
  
  await superAdmin.save();
  
  logger.info('SuperAdmin user created successfully');
  process.exit();
}

createSuperAdmin();
