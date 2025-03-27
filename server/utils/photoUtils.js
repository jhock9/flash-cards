require('dotenv').config();
const { ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { exiftool } = require('exiftool-vendored');
const logger = require('../config/winston');
const s3 = require('../config/awsClient');
const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;

// Fetch all objects from S3 Bucket
const fetchS3Objects = async () => {
  try {
    const command = new ListObjectsV2Command({ Bucket: AWS_BUCKET_NAME });
    logger.info('Sending ListObjectsV2Command to AWS S3...');
    
    const { Contents } = await s3.send(command);
    logger.info(`Fetched ${Contents.length} objects from S3 bucket.`);
    
    return Contents || [];
  } catch (error) {
    logger.error(`Failed to fetch S3 objects: ${error.message}`);
    return [];
  }
};

// Extract Keywords using Exiftool
const extractKeywordsFromFile = async (filePath) => {
  try {
    const metadata = await exiftool.read(filePath);
    return metadata.Keywords || [];
  } catch (error) {
    logger.error(`Error extracting keywords from ${filePath}: ${error.message}`);
    return [];
  }
}

// Helper to compare arrays
const arraysAreEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value) => arr2.includes(value));
};

// Export to photoSyncService.js
module.exports = {
  fetchS3Objects,
  extractKeywordsFromFile,
  arraysAreEqual
};