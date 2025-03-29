require('dotenv').config();
const path = require('path');
const fs = require('fs');
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const logger = require('../config/winston');
const s3 = require('../config/awsClient');
const Photo = require('../models/photoModel');
const { fetchS3Objects, extractKeywordsFromFile, arraysAreEqual } = require('../utils/photoUtils');
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_REGION = process.env.AWS_REGION;

// Process and Insert Photos into MongoDB
const updatePhotoData = async () => {
  logger.info('Starting AWS S3 to MongoDB photo sync process...');
  const objects = await fetchS3Objects();
  const existingPhotos = await Photo.find({});
  const existingPhotosMap = new Map(existingPhotos.map(photo => [photo.awsKey, photo]));
  const awsKeysSet = new Set();
  let updatedCount = 0;
  let insertedCount = 0;
  
  const tempDir = path.join(__dirname, '../utils/temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }
  
  for (const obj of objects) {
    const tempFilePath = path.join(tempDir, obj.Key);
    const awsKey = obj.Key;
    awsKeysSet.add(awsKey);
    
    // Download from S3 to temp file
    try {
      const command = new GetObjectCommand({ Bucket: AWS_BUCKET_NAME, Key: obj.Key });
      const { Body } = await s3.send(command);
      const fileStream = fs.createWriteStream(tempFilePath);
      Body.pipe(fileStream);
      await new Promise((resolve, reject) => fileStream.on('finish', resolve).on('error', reject));
      
      // Extract Keywords
      const keywords = await extractKeywordsFromFile(tempFilePath);
      
      // Remove temp file
      try {
        fs.unlinkSync(tempFilePath);
      } catch (err) {
        logger.warn(`Could not delete temp file ${tempFilePath}: ${err.message}`);
      }
      
      // Prepare and save to MongoDB
      let tags = [];
      if (typeof keywords === 'string') {
        tags = keywords.split(/[\s,]+/).map(tag => tag.trim()).filter(Boolean);
      } else if (Array.isArray(keywords)) {
        tags = keywords.flatMap(k => k.split(/[\s,]+/).map(tag => tag.trim())).filter(Boolean);
      }
      
      const baseUrl = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${awsKey}`;
      const existingPhoto = existingPhotosMap.get(awsKey);
      
      if (existingPhoto) {
        // Update photo if any details (tags, baseUrl) have changed
        if (!arraysAreEqual(existingPhoto.tagsFromAws, tags) || existingPhoto.baseUrl !== baseUrl) {
          existingPhoto.tagsFromAws = tags;
          existingPhoto.baseUrl = baseUrl;
          await existingPhoto.save();
          updatedCount++;
        }
      } else {
        // If the photo data does not exist in the database, add it
        await Photo.create({ awsKey, baseUrl, tagsFromAws: tags });
        insertedCount++;
      }
    } catch (error) {
      logger.error(`Failed to process ${obj.Key}: ${error.message}`);
    }
  }
  
  const photosToRemove = existingPhotos.filter(photo => !awsKeysSet.has(photo.awsKey));
  for (const photo of photosToRemove) {
    await Photo.findByIdAndDelete(photo._id);
    logger.info(`Deleted photo from MongoDB: ${photo.awsKey}`);
  }
  
  logger.info(`Inserted: ${insertedCount}, Updated: ${updatedCount}, Removed: ${photosToRemove.length}`);
  logger.info('MongoDB photo collection successfully synced with AWS S3.');
};

updatePhotoData();

// Export to server.js and photoDBRoutes.js
module.exports = updatePhotoData;
