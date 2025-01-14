require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Photo = require('../models/photoModel');
const User = require('../models/userModel');
const Client = require('../models/clientModel');
const Appointment = require('../models/appointmentModel');

const MONGO_URI = process.env.MONGO_URI;

// Only connect if there is no existing connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  }
};

// Run all scripts
const dataFetch = async () => {
  try {
    await connectDB();
    
    const { activeTags, inactiveTags } = await getTagData();
    const adminData = await getAdminData();
    
    // console.log({ activeTags, inactiveTags, adminData });
    console.log('Data fetch complete.');
    return { activeTags, inactiveTags, adminData };
    
  } catch (error) {
    console.error('Error running the scripts:', error);
  }
};

// Get tag data across all photos
const getTagData = async () => {
  try {
    const photos = await Photo.find({});
    const tagData = {};
    
    photos.forEach(photo => {
      photo.tagsFromGoogle.forEach(tag => {
        tagData[tag] = (tagData[tag] || 0) + 1;
      });
    });
    
    const sortedTags = Object.entries(tagData)
    .sort(([tagA, countA], [tagB, countB]) => countB - countA || tagA.localeCompare(tagB));
    
    const activeTags = Object.fromEntries(
      sortedTags.filter(([_, count]) => count >= 6)
    );
    
    const inactiveTags = Object.fromEntries(
      sortedTags.filter(([_, count]) => count >= 1 && count <= 5)
    );
    
    return { activeTags, inactiveTags };
  } catch (error) {
    console.error('Error fetching tag data:', error);
    return null;
  }
};

// Get admin data
const getAdminData = async () => {
  try {
    const totalPhotos = await Photo.countDocuments({});
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalClients = await Client.countDocuments({});
    const totalAppointments = await Appointment.countDocuments({});
    
    return { totalPhotos, totalUsers, totalAdmins, totalClients, totalAppointments };
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return null;
  }
};

// Export to dataFetchRoutes.js
module.exports = dataFetch;