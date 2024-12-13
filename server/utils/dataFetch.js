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
    
    const tagCounts = await getTagCounts();
    const adminData = await getAdminData();
    
    console.log({ tagCounts, adminData });
    return { tagCounts, adminData };
    
  } catch (error) {
    console.error('Error running the scripts:', error);
  } finally {
    await mongoose.disconnect()
    console.log('MongoDB connection closed');
  }
};

// Get tag counts across all photos
const getTagCounts = async () => {
  try {
    const photos = await Photo.find({});
    const tagCounts = {};
    
    photos.forEach(photo => {
      photo.tagsFromGoogle.forEach(tag => {
        if (tag in tagCounts) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    });
    
    const filteredTagCounts = Object.entries(tagCounts)
      .filter(([_, count]) => count > 1) // Only include tags with count greater than 1
      .sort((a, b) => b[1] - a[1]) // Sort in descending order
      .reduce((acc, [tag, count]) => {
        acc[tag] = count;
        return acc;
      }, {}); // Convert back to an object
    
    return filteredTagCounts;
  } catch (error) {
    console.error('Error fetching tag counts:', error);
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
export { dataFetch };
