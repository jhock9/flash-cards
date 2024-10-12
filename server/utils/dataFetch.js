require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const Photo = require('../models/photoModel');
const User = require('../models/userModel');
const Client = require('../models/clientModel');

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
    const totalPhotos = await getTotalPhotos();
    const profileCounts = await getProfileCounts();
    
    console.log({ tagCounts, totalPhotos, profileCounts });
    return { tagCounts, totalPhotos, profileCounts };
    
  } catch (error) {
    console.error('Error running the scripts:', error);
  } finally {
    mongoose.connection.close();
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

// Get total quantity of photos
const getTotalPhotos = async () => {
  try {
    const totalPhotos = await Photo.countDocuments({});
    return totalPhotos;
  } catch (error) {
    console.error('Error fetching total photos:', error);
    return null;
  }
};

// Get total number of admin, user, and client profiles
const getProfileCounts = async () => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalClients = await Client.countDocuments({});
    
    return { totalUsers, totalAdmins, totalClients };
  } catch (error) {
    console.error('Error fetching profile counts:', error);
    return null;
  }
};

dataFetch();
